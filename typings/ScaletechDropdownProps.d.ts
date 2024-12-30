/**
 * This file was generated from ScaletechDropdown.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { DynamicValue, EditableValue, ListValue, ListExpressionValue, ReferenceValue, ReferenceSetValue } from "mendix";

export type DataTypeEnum = "Association" | "Enumeration" | "Boolean";

export interface ScaletechDropdownContainerProps {
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
}

export interface ScaletechDropdownPreviewProps {
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    DataType: DataTypeEnum;
    associationData: string;
    objectsDatasources: {} | { caption: string } | { type: string } | null;
    myOption: string;
    EnumerationValue: string;
    BooleanValue: string;
    myPlaceholderText: string;
}
