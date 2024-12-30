import { createElement, ReactElement, useState, useEffect } from "react";
import { ScaletechDropdownContainerProps } from "../typings/ScaletechDropdownProps";
import Selection from "./components/Selection";

export interface SelectionData {
    id: string;
    values: string;
}

export const ScaletechDropdown = (props: ScaletechDropdownContainerProps): ReactElement => {
    const { objectsDatasources, myOption, associationData, EnumerationValue, BooleanValue } = props;

    const [options, setOptions] = useState<SelectionData[]>([]);
    const [selectOptionValue, setSelectOptionValue] = useState<SelectionData[]>([]);

    useEffect(() => {
        if (objectsDatasources && objectsDatasources.items) {
            const dropdownOptions = generateDropdownOptions(objectsDatasources.items, item => ({
                id: item.id,
                values: myOption?.get(item)?.value || ""
            }));
            setOptions(dropdownOptions);

            if (associationData && associationData.value) {
                const currentAssociationId: any = associationData.value;
                const AssociationId = currentAssociationId.id;
                const filteredOption = dropdownOptions.filter(item => item.id === AssociationId);
                setSelectOptionValue(filteredOption);
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
    const handleSelectionChange = (selected: SelectionData) => {
        if (associationData && associationData.setValue && objectsDatasources && objectsDatasources.items) {
            const selectedObject = objectsDatasources.items.find(
                item => myOption?.get(item)?.value === selected.values
            );
            associationData.setValue(selectedObject as any);
        } else if (EnumerationValue) {
            EnumerationValue.setValue(selected.values);
        } else if (BooleanValue) {
            BooleanValue.setValue(selected.values.toLowerCase() === "true");
        }
    };

    return (
        <Selection
            SelectionData={options}
            handleSelectionChange={handleSelectionChange}
            optionValue={selectOptionValue}
        />
    );
};
