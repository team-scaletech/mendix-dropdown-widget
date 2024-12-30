import { ReactElement, createElement } from "react";
import { ScaletechDropdownPreviewProps } from "../typings/ScaletechDropdownProps";
import Selection from "./components/Selection";

export function preview({}: ScaletechDropdownPreviewProps): ReactElement {
    return <Selection />;
}

export function getPreviewCss(): string {
    return require("./ui/ScaletechDropdown.css");
}
