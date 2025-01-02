import { ReactElement, createElement } from "react";
import { ScaletechDropdownPreviewProps } from "../typings/ScaletechDropdownProps";
import Selection from "./components/Selection";

export const preview = ({}: ScaletechDropdownPreviewProps): ReactElement => {
    return <Selection />;
};

export const getPreviewCss = (): string => {
    return require("./ui/ScaletechDropdown.css");
};
