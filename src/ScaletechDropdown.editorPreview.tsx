import { ReactElement, createElement } from "react";
import { ScaletechDropdownPreviewProps } from "../typings/ScaletechDropdownProps";
import ReactSelection from "./components/Reactselect";

export const preview = ({}: ScaletechDropdownPreviewProps): ReactElement => {
    return <ReactSelection/>
};

export const getPreviewCss = (): string => {
    return require("./ui/ScaletechDropdown.css");
};
