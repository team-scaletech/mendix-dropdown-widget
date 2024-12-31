import { createElement, FC } from "react";
import Select from "react-dropdown-select";
import { SelectionData } from "src/ScaletechDropdown";

interface SelectionProps {
    SelectionData?: SelectionData[];
    handleSelectionChange?: (e: SelectionData[]) => void;
    optionValue?: SelectionData[];
    placeholderText?: string;
    isMulti?: boolean;
}

const Selection: FC<SelectionProps> = props => {
    const { SelectionData, handleSelectionChange, optionValue, placeholderText, isMulti } = props;
    return (
        <Select
            options={SelectionData || []}
            labelField="values"
            valueField="values"
            values={optionValue ? optionValue : []}
            onChange={values => handleSelectionChange?.(values)}
            placeholder={placeholderText ? placeholderText : ""}
            multi={isMulti}
        />
    );
};

export default Selection;
