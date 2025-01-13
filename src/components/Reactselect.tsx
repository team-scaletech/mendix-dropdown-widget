import { createElement, FC, useEffect, useState } from "react";
import Select, { components } from "react-select";
import { SelectionData } from "src/ScaletechDropdown";
import "../ui/ScaletechDropdown.css";
import { SelectionMethodEnum } from "typings/ScaletechDropdownProps";

interface SelectionProps {
    SelectionData?: SelectionData[];
    handleSelectionChange?: (value: SelectionData[]) => void;
    optionValue?: SelectionData[];
    placeholderText?: string;
    isMulti?: boolean;
    SelectionMethod?: SelectionMethodEnum;
    isSelect?: boolean;
    CaptionSelect?: string;
    readOnly?: boolean;
}

const ReactSelection: FC<SelectionProps> = props => {
    const {
        SelectionData,
        handleSelectionChange,
        optionValue,
        placeholderText,
        isMulti,
        SelectionMethod,
        isSelect,
        CaptionSelect,
        readOnly
    } = props;
    const [selectedOptions, setSelectedOptions] = useState<SelectionData[]>();
    const [allSelected, setAllSelected] = useState(false);
    // const [menuIsOpen, setMenuIsOpen] = useState(false); // Manage dropdown visibility

    useEffect(() => {
        setSelectedOptions(SelectionData || []);
        setAllSelected(SelectionData?.length === (optionValue?.length || 0));
    }, [SelectionData]);

    const handleSelectAll = () => {
        const allOptions = optionValue || [];
        setSelectedOptions(allOptions);
        setAllSelected(true);
        handleSelectionChange?.(allOptions);
        // setMenuIsOpen(true); // Show the dropdown
    };

    const handleClearAll = () => {
        setSelectedOptions([]);
        setAllSelected(false);
        handleSelectionChange?.([]);
        // setMenuIsOpen(true); // Show the dropdown
    };

    const handleChange = (selected: SelectionData[] | null) => {
        const newSelection = selected || [];
        setSelectedOptions(newSelection);
        setAllSelected(newSelection.length === (optionValue?.length || 0));
        handleSelectionChange?.(newSelection);
    };

    const customMenuList = (props: any) => {
        return (
            <components.MenuList {...props}>
                {isSelect && (
                    <div>
                        <div
                            className="dropdown-actions"
                            onClick={e => {
                                e.stopPropagation();
                                allSelected ? handleClearAll() : handleSelectAll();
                            }}
                        >
                            <input type="checkbox" checked={allSelected} readOnly />
                            <label>{CaptionSelect}</label>
                        </div>
                    </div>
                )}
                {props.children}
            </components.MenuList>
        );
    };

    // Custom option with checkbox
    const customOption = (props: any) => {
        const { data, isSelected } = props;
        return (
            <div>
                <components.Option {...props}>
                    <div className="custom-checkbox-option">
                        <input type="checkbox" checked={isSelected} readOnly />
                        <label>{data.label}</label>
                    </div>
                </components.Option>
            </div>
        );
    };

    return (
        <div className="react-selection-container">
            <Select
                menuPlacement="auto"
                options={optionValue || []}
                value={selectedOptions}
                onChange={value => handleChange(value as SelectionData[])}
                placeholder={placeholderText || ""}
                isMulti={isMulti}
                classNamePrefix="react-select-option"
                components={
                    isMulti && SelectionMethod === "Checkbox" ? { MenuList: customMenuList, Option: customOption } : {}
                }
                // menuIsOpen={true}
                isDisabled={readOnly}
                closeMenuOnSelect={!isMulti}
                hideSelectedOptions={false}
                menuPortalTarget={document.body}
            />
        </div>
    );
};

export default ReactSelection;
