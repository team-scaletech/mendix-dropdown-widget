/**
 * This file was generated from Scaletechdropdown.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import {
    ActionValue,
    DynamicValue,
    EditableValue,
    ListValue,
    ListExpressionValue,
    ReferenceValue,
    ReferenceSetValue
} from "mendix";

export type DataTypeEnum = "Association" | "Enumeration" | "Boolean";

export type SelectionMethodEnum = "Checkbox" | "RowClick";

export interface ScaletechdropdownContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    DataType: DataTypeEnum;
    associationData?: ReferenceValue | ReferenceSetValue;
    objectsDatasources: ListValue;
    myOption: ListExpressionValue<string>;
    EnumerationValue: EditableValue<string>;
    BooleanValue: EditableValue<boolean>;
    myPlaceholderText?: DynamicValue<string>;
    SelectionMethod: SelectionMethodEnum;
    isSelect: boolean;
    CaptionSelect: DynamicValue<string>;
    OnChange?: ActionValue;
}

export interface ScaletechdropdownPreviewProps {
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    DataType: DataTypeEnum;
    associationData: string;
    objectsDatasources: {} | { caption: string } | { type: string } | null;
    myOption: string;
    EnumerationValue: string;
    BooleanValue: string;
    myPlaceholderText: string;
    SelectionMethod: SelectionMethodEnum;
    isSelect: boolean;
    CaptionSelect: string;
    OnChange: {} | null;
}
