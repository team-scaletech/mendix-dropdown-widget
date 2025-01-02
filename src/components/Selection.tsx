import { createElement, FC } from "react";
import Select from "react-dropdown-select";
import { SelectionData } from "src/ScaletechDropdown";
import "../ui/ScaletechDropdown.css";

interface SelectionProps {
    SelectionData?: SelectionData[];
    handleSelectionChange?: (e: SelectionData[]) => void;
    optionValue?: SelectionData[];
    placeholderText?: string;
    isMulti?: boolean;
}

const Selection: FC<SelectionProps> = props => {
    const { SelectionData, handleSelectionChange, optionValue, placeholderText, isMulti } = props;

    const customDropdownRenderer = ({ props, state, methods }: any) => {
        const regexp = new RegExp(state.search, "i");
        // const [isChecked,setIsChecked]=useState(state.values.indexOf(option) !== -1)

        const NewOptionData = props.options.map((item: { id: string; values: string }) => {
            return {
                ...item,
                isCheck: state.values.some((aItem: { id: string }) => aItem.id === item.id) ? true : false
            };
        });
        return (
            <div>
                {isMulti && (
                    <div className="select-action-button">
                        {state.values.length === props.options.length ? (
                            <button onClick={methods.clearAll} className="action-button clear-action-button">
                                Clear all
                            </button>
                        ) : (
                            <button onClick={methods.selectAll} className="action-button">
                                Select all
                            </button>
                        )}
                    </div>
                )}
                <div className="option-wrapper">
                    {NewOptionData.filter((item: { [id: string]: string; values: string }) =>
                        regexp.test(item[props.searchBy] || item.values)
                    ).map((option: { isCheck: boolean; id: string; values: string }) => {
                        return (
                            <div
                                key={option.id}
                                className="option"
                                onClick={e => {
                                    e.stopPropagation(); // Prevent triggering higher-level click events
                                    methods.addItem(option);
                                }}
                            >
                                {isMulti && <input type="checkbox" checked={option.isCheck} />}
                                <div className="option-label">{option.values}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <Select
            options={SelectionData || []}
            labelField="values"
            valueField="values"
            values={optionValue ? optionValue : []}
            onChange={values => handleSelectionChange?.(values)}
            placeholder={placeholderText ? placeholderText : ""}
            multi={isMulti}
            dropdownRenderer={({ props, state, methods }) => customDropdownRenderer({ props, state, methods })}
            dropdownHandle
            portal={document.body}
        />
    );
};
export default Selection;
