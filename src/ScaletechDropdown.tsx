import { createElement, ReactElement, useState, useEffect } from "react";
import { ScaletechDropdownContainerProps } from "../typings/ScaletechDropdownProps";
import { GUID } from "mendix";
import ReactSelection from "./components/Reactselect";

export interface SelectionData {
    label: string;
    value: string;
}

export const ScaletechDropdown = (props: ScaletechDropdownContainerProps): ReactElement => {
    const {
        objectsDatasources,
        myOption,
        associationData,
        EnumerationValue,
        BooleanValue,
        myPlaceholderText,
        OnChange,
        SelectionMethod,
        isSelect,
        CaptionSelect
    } = props;

    const [options, setOptions] = useState<SelectionData[]>([]);
    const [selectOptionValue, setSelectOptionValue] = useState<SelectionData[]>([]);
    const [isMulti, setIsMulti] = useState(false);

    useEffect(() => {
        if (objectsDatasources && objectsDatasources.items) {
            const dropdownOptions = generateDropdownOptions(objectsDatasources.items, item => ({
                value: item.id,
                label: myOption?.get(item)?.value || ""
            }));
            setOptions(dropdownOptions);

            if (associationData && associationData.value !== undefined) {
                setIsMulti(associationData.type === "ReferenceSet");
                if (associationData.type === "ReferenceSet") {
                    // Ensure associationData.value is an array
                    if (Array.isArray(associationData.value)) {
                        const currentAssociation = associationData.value;
                        const filteredOption = dropdownOptions.filter(itemB =>
                            currentAssociation.some((itemA: { id: GUID }) => itemA.id === itemB.value)
                        );
                        setSelectOptionValue(filteredOption);
                    } else {
                        console.error("Expected associationData.value to be an array, but it is not.");
                    }
                } else {
                    const currentAssociationId: any = associationData.value;
                    const AssociationId = currentAssociationId.id;
                    const filteredOption = dropdownOptions.filter(item => item.value === AssociationId);
                    setSelectOptionValue(filteredOption);
                }
            }
        } else if (EnumerationValue && EnumerationValue.universe) {
            const dropdownOptions = generateDropdownOptions(EnumerationValue.universe, item => ({
                label: item,
                value: item
            }));
            updateDropdownOptions(dropdownOptions, convertToString(EnumerationValue.value));
        } else if (BooleanValue && BooleanValue.universe) {
            const dropdownOptions = generateDropdownOptions(BooleanValue.universe, item => {
                const booleanItem = item ? "Yes" : "No"; // This variable is declared but not used.
                return {
                    label: booleanItem,
                    value: booleanItem
                };
            });
            const selectBoolean = convertToString(BooleanValue.value).toLowerCase() === "true" ? "Yes" : "No";
            updateDropdownOptions(dropdownOptions, selectBoolean);
        }
    }, [objectsDatasources, associationData, EnumerationValue, BooleanValue]);

    const generateDropdownOptions = (items: any[], mapFn: (item: any) => { label: string; value: string }) =>
        items.map(mapFn);

    const updateDropdownOptions = (options: { label: string; value: string }[], selectedValue: string) => {
        setOptions(options);
        if (selectedValue) {
            setSelectOptionValue([{ label: selectedValue, value: selectedValue }]);
        }
    };

    const convertToString = (value: { toString: () => any } | null | undefined) => {
        return value !== null && value !== undefined ? value.toString() : "";
    };

    // Handle dropdown selection changes
    const handleSelectionChange = (selected: SelectionData[] | SelectionData) => {
        if (OnChange?.canExecute) {
            OnChange.execute();
        }
        if (associationData && associationData.setValue && objectsDatasources && objectsDatasources.items) {
            // Check if selected is an object (not an array)
            if (typeof selected === "object" && selected !== null && !Array.isArray(selected)) {
                // Handle single selection (object case)
                const selectedObject = objectsDatasources.items.find(
                    item => myOption?.get(item)?.value === selected.label
                );
                if (selectedObject) {
                    associationData.setValue(selectedObject as any);
                } else {
                    console.error("No matching object found for the selected value.");
                }
            }
            // Check if selected is an array (multi-selection case)
            else if (Array.isArray(selected)) {
                // Handle multiple selections
                const selectedObjects = objectsDatasources.items.filter(itemA =>
                    selected.some(itemB => itemA.id === itemB.value)
                );
                if (Array.isArray(associationData.value)) {
                    associationData.setValue(selectedObjects as any); // Cast if necessary
                } else {
                    console.error("Expected an array, but the associationData type doesn't match.");
                }
            }
        }
        // Handle enumeration and boolean values if selected is an object
        else if (typeof selected === "object" && selected !== null && !Array.isArray(selected)) {
            if (EnumerationValue) {
                EnumerationValue.setValue(selected.label);
            } else if (BooleanValue) {
                BooleanValue.setValue(selected.label.toLowerCase() === "yes");
            }
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <ReactSelection
                SelectionData={selectOptionValue}
                handleSelectionChange={handleSelectionChange}
                optionValue={options}
                placeholderText={myPlaceholderText?.value}
                isMulti={isMulti}
                SelectionMethod={SelectionMethod}
                isSelect={isSelect}
                CaptionSelect={CaptionSelect.value}
            />
        </div>
    );
};
