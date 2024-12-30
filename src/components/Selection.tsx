import { createElement, FC } from "react";
import Select from "react-dropdown-select";
import { SelectionData } from "src/ScaletechDropdown";

interface SelectionProps {
    SelectionData?: SelectionData[];
    handleSelectionChange?: (e: SelectionData) => void;
    optionValue?: SelectionData[];
    placeholderText?: string;
}

const Selection: FC<SelectionProps> = props => {
    const { SelectionData, handleSelectionChange, optionValue, placeholderText } = props;
    return (
        <Select
            options={SelectionData || []}
            labelField="values"
            valueField="values"
            values={optionValue ? optionValue : []}
            onChange={values => handleSelectionChange?.(values[0])}
            placeholder={placeholderText ? placeholderText : ""}
        />
    );
};

export default Selection;
