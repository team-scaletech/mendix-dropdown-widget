import { createElement, FC } from "react";
import Select from "react-dropdown-select";
import { SelectionData } from "src/ScaletechDropdown";

interface SelectionProps {
    SelectionData?: SelectionData[];
    handleSelectionChange?: (e: SelectionData) => void;
    optionValue?: SelectionData[];
}

const Selection: FC<SelectionProps> = ({ SelectionData, handleSelectionChange, optionValue }) => {
    return (
        <Select
            options={SelectionData || []}
            labelField="values"
            valueField="values"
            values={optionValue ? optionValue : []}
            onChange={values => handleSelectionChange?.(values[0])}
        />
    );
};

export default Selection;
