/**
 * This file was generated from ScaletechDropdown.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue, ListValue, ListExpressionValue, ReferenceValue, ReferenceSetValue } from "mendix";

export type DataTypeEnum = "Association" | "Enumeration" | "Boolean";

export interface ScaletechDropdownContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    DataType: DataTypeEnum;
    associationData?: ReferenceValue | ReferenceSetValue;
    objectsDatasources: ListValue;
    myOption: ListExpressionValue<string>;
    EnumerationValue: EditableValue<string>;
    BooleanValue: EditableValue<boolean>;
}

export interface ScaletechDropdownPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    DataType: DataTypeEnum;
    associationData: string;
    objectsDatasources: {} | { caption: string } | { type: string } | null;
    myOption: string;
    EnumerationValue: string;
    BooleanValue: string;
}
