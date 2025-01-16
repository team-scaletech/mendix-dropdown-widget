import { ReactElement, createElement } from "react";
import { ScaletechdropdownPreviewProps } from "../typings/ScaletechdropdownProps";
import ReactSelection from "./components/Reactselect";

export const preview = ({}: ScaletechdropdownPreviewProps): ReactElement => {
    return <ReactSelection />;
};

export function getPreviewCss(): string {
    return require("./ui/Scaletechdropdown.css");
}
