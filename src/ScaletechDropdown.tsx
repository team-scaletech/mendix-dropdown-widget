import { createElement, ReactElement, useState, useEffect } from "react";
import { ScaletechDropdownContainerProps } from "../typings/ScaletechDropdownProps";
import Selection from "./components/Selection";
import { GUID } from "mendix";

export interface SelectionData {
    id: string;
    values: string;
}

export const ScaletechDropdown = (props: ScaletechDropdownContainerProps): ReactElement => {
    const { objectsDatasources, myOption, associationData, EnumerationValue, BooleanValue, myPlaceholderText } = props;

    const [options, setOptions] = useState<SelectionData[]>([]);
    const [selectOptionValue, setSelectOptionValue] = useState<SelectionData[]>([]);
    const [isMulti, setIsMulti] = useState(false);

    useEffect(() => {
        if (objectsDatasources && objectsDatasources.items) {
            const dropdownOptions = generateDropdownOptions(objectsDatasources.items, item => ({
                id: item.id,
                values: myOption?.get(item)?.value || ""
            }));
            setOptions(dropdownOptions);

            if (associationData && associationData.value !== undefined) {
                setIsMulti(associationData.type === "ReferenceSet");
                if (isMulti) {
                    // Ensure associationData.value is an array
                    if (Array.isArray(associationData.value)) {
                        const currentAssociation = associationData.value;
                        const filteredOption = dropdownOptions.filter(itemB =>
                            currentAssociation.some((itemA: { id: GUID }) => itemA.id === itemB.id)
                        );
                        setSelectOptionValue(filteredOption);
                    } else {
                        console.error("Expected associationData.value to be an array, but it is not.");
                    }
                } else {
                    const currentAssociationId: any = associationData.value;
                    const AssociationId = currentAssociationId.id;
                    const filteredOption = dropdownOptions.filter(item => item.id === AssociationId);
                    setSelectOptionValue(filteredOption);
                }
            }
        } else if (EnumerationValue && EnumerationValue.universe) {
            const dropdownOptions = generateDropdownOptions(EnumerationValue.universe, item => ({
                id: item,
                values: item
            }));
            updateDropdownOptions(dropdownOptions, convertToString(EnumerationValue.value));
        } else if (BooleanValue && BooleanValue.universe) {
            const dropdownOptions = generateDropdownOptions(BooleanValue.universe, item => ({
                id: item.toString(),
                values: item.toString()
            }));
            updateDropdownOptions(dropdownOptions, convertToString(BooleanValue.value));
        }
    }, [objectsDatasources, associationData, EnumerationValue, BooleanValue]);

    const generateDropdownOptions = (items: any[], mapFn: (item: any) => { id: string; values: string }) =>
        items.map(mapFn);

    const updateDropdownOptions = (options: { id: string; values: string }[], selectedValue: string) => {
        setOptions(options);
        if (selectedValue) {
            setSelectOptionValue([{ id: selectedValue, values: selectedValue }]);
        }
    };

    const convertToString = (value: { toString: () => any } | null | undefined) => {
        return value !== null && value !== undefined ? value.toString() : "";
    };

    // Handle dropdown selection changes
    const handleSelectionChange = (selected: SelectionData[]) => {
        if (associationData && associationData.setValue && objectsDatasources && objectsDatasources.items) {
            if (isMulti) {
                // Handle multiple selections
                const selectedObjects = objectsDatasources.items.filter(itemA =>
                    selected.some(itemB => itemA.id === itemB.id)
                );
                // Check if setValue accepts an array
                if (Array.isArray(associationData.value)) {
                    associationData.setValue(selectedObjects as any); // Cast if necessary
                } else {
                    console.error("Expected an array, but the associationData type doesn't match.");
                }
            } else {
                // Handle single selection
                const selectedObject = objectsDatasources.items.find(
                    item => myOption?.get(item)?.value === selected[0]?.values
                );
                if (selectedObject) {
                    associationData.setValue(selectedObject as any);
                } else {
                    console.error("No matching object found for the selected value.");
                }
            }
        } else if (EnumerationValue) {
            EnumerationValue.setValue(selected[0]?.values);
        } else if (BooleanValue) {
            BooleanValue.setValue(selected[0]?.values.toLowerCase() === "true");
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Selection
                SelectionData={options}
                handleSelectionChange={handleSelectionChange}
                optionValue={selectOptionValue}
                placeholderText={myPlaceholderText?.value}
                isMulti={isMulti}
            />
        </div>
    );
};
