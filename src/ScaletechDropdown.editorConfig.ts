import { ScaletechDropdownPreviewProps } from "../typings/ScaletechDropdownProps";
import { hidePropertiesIn } from "@mendix/pluggable-widgets-tools";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string; // text to be shown inside the dropzone when empty
    showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

// export function getProperties(
//     _values: ScaletechDropdownPreviewProps,
//     defaultProperties: Properties /* , target: Platform*/
// ): Properties {
//     // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
//     /* Example
//     if (values.myProperty === "custom") {
//         delete defaultProperties.properties.myOtherProperty;
//     }
//     */
//     return defaultProperties;
// }

// export function check(_values: ScaletechDropdownPreviewProps): Problem[] {
//     const errors: Problem[] = [];
//     // Add errors to the above array to throw errors in Studio and Studio Pro.
//     /* Example
//     if (values.myProperty !== "custom") {
//         errors.push({
//             property: `myProperty`,
//             message: `The value of 'myProperty' is different of 'custom'.`,
//             url: "https://github.com/myrepo/mywidget"
//         });
//     }
//     */
//     return errors;
// }

// export function getPreview(values: ScaletechDropdownPreviewProps, isDarkMode: boolean, version: number[]): PreviewProps {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     }
// }

// export function getCustomCaption(values: ScaletechDropdownPreviewProps, platform: Platform): string {
//     return "ScaletechDropdown";
// }

export function getProperties(_values: ScaletechDropdownPreviewProps, defaultProperties: Properties): Properties {
    if (_values.DataType === "Association") {
        hidePropertiesIn(defaultProperties, _values, ["EnumerationValue", "BooleanValue"]);
    } else if (_values.DataType === "Enumeration") {
        hidePropertiesIn(defaultProperties, _values, [
            "associationData",
            "objectsDatasources",
            "myOption",
            "BooleanValue"
        ]);
    } else if (_values.DataType === "Boolean") {
        hidePropertiesIn(defaultProperties, _values, [
            "associationData",
            "objectsDatasources",
            "myOption",
            "EnumerationValue"
        ]);
    }
    if (_values.SelectionMethod === "RowClick") {
        hidePropertiesIn(defaultProperties, _values, ["isSelect", "CaptionSelect"]);
    }

    // Always return the defaultProperties, even if no changes were made
    return defaultProperties;
}

// export function getPreview(_values: ScaletechDropdownPreviewProps, isDarkMode: boolean): PreviewProps {
//     // Define your color palette
//     const readOnlyColor = "lightgray"; // Color when widget is readOnly
//     const defaultColor = isDarkMode ? "#333333" : "#FFFFFF"; // Default color based on dark mode

//     // Define icon filter based on readOnly state
//     const iconClass = _values.readOnly ? "readonly-icon" : "default-icon"; // Class for styling icon

//     return {
//         type: "Container",
//         borders: true,
//         borderWidth: 1,
//         borderRadius: 2,
//         backgroundColor: _values.readOnly ? readOnlyColor : defaultColor, // Apply color change based on readOnly state
//         padding: 4,
//         children: [
//             {
//                 type: "RowLayout",
//                 columnSize: "grow",
//                 children: [
//                     {
//                         type: "Container",
//                         grow: 1,
//                         borders: true,
//                         borderWidth: 1,
//                         borderRadius: 2,
//                         backgroundColor: _values.readOnly ? readOnlyColor : defaultColor, // Apply color change here as well
//                         padding: 4,
//                         children: []
//                     },
//                     // Add the widget icon here
//                     {
//                         type: "Image",
//                         document: iconClass, // Use SVG icon (replace with your path)
//                         width: 24, // Width of the icon
//                         height: 24, // Height of the icon
//                         property: {
//                             document: iconClass // Use SVG icon (replace with your path)
//                         }
//                     }
//                 ]
//             }
//         ]
//     };
// }

export function getPreview(_values: ScaletechDropdownPreviewProps, isDarkMode: boolean): PreviewProps {
    // Define your color palette
    const readOnlyColor = "lightgray"; // Color for readOnly state
    const defaultColor = isDarkMode ? "#333333" : "#FFFFFF"; // Default color based on dark mode

    // Determine the current background color
    const backgroundColor = _values.readOnly ? readOnlyColor : defaultColor;

    // Base64 encoded icon for default
    const BASE64_DEFAULT_ICON =
        "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfpAQkKJwBqpbFjAAADEklEQVRYw+3XT2hcVRQG8N+beeM0SYNNpHTUlgRaWiOIFl1oCxa7URSRIkIp1IXoQkGIIKhVFy6EiCAuFLf+gS7cCUEExVIsEoW2GoUUaQVRjGJsTBqTOpnMdTHp5E1nXmaSmaz0uzBc7rn3O2e+e+6597HBiJC3zwH9og7yBhed9KV/6DViVtiANmtEb+wpw/KCxXVFmhOlrM3pNWw6ct5OC950ch0y9Hvddhc871Kd9YBhXS5QEpzWv674C84JzuhrYOt3WlDKyGJBsY0NXUmOWL/ccr9oAdlMG8RXY5NnnfCSnuRgnOh3e8SQkLL8K6NKq9I/5wV5Q7q84u8VQxCcshn3m18l6SbdkrIHZ/XJOOby8syiV+X0OCUISYlmTCtbatiCKfOp0QdbHZU371OX5Bxx/RUlkhKNechAKsU5P6Y6iEwblfWutzzmSZ+ZWtn6FYnWjhWJ2KQgh9g2XdhckSheF3EjXPYbKPk9OZxRRJ9r26BunHdb9KEY+87t9njHWGqCphP3ug4Fz5i/qhZH7rQH4xw2tSG1NAimHCZ21ITFjpMvmnBUHCGyw222dPjC+cs3fl6z7P9FVHTPuMvemtFZn9QemPaw2/m6LHitM9SVarpVoc6yS0fKSJwQ6msfoGzA07qqM7rlm7IEc2mXUTLKCW8L2OuJqoObjdjRJJsjZR96o/HDJ66ZWN876MGWlOj23nI1XcVBaND7wue2t/QPLjaXaJdHUTaYUH3cId1N4y+bTnsZJh3st7/OHsyabUmkFFTSdMqfdZafVn2ktIzKdmbd446aTZ7xkV864eB/NEW0/HuToZobbc6Ymc65GfStslK1LSl6uTPUlXNwo50i2cR4xq3iTiRqspp+bxRBwRH5qmDZhmU7WGztQk8uPuPYcjU9VC0Wg1400ICq5Ljjrbhodqk84PEUyzYfm27fwVnjCg0iDU6YW6tEN7hXULY7MTrmvoYP45JfW/uyTjo46G4QVb8UKZs02QrR6g5mzOmRcU3C8oeldoivoJKMOQ/bV3OSZ7zvh0442HD8C2fTckA7xNJvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI1LTAxLTA5VDEwOjM3OjE2KzAwOjAwBMe2HgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNS0wMS0wOVQxMDozNzoxNiswMDowMHWaDqIAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC";

    const icon = { data: BASE64_DEFAULT_ICON };

    return {
        type: "Container",
        borders: true,
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor, // Use the determined background color
        padding: 0,
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                children: [
                    {
                        type: "Container",
                        grow: 1,
                        borders: true,
                        borderWidth: 1,
                        borderRadius: 2,
                        backgroundColor, // Reuse the background color
                        padding: 0,
                        children: []
                    },
                    // Add the widget icon
                    {
                        type: "Image",
                        ...icon, // Use either Base64 or SVG dynamically
                        // property: [{ icon: "scaletech" }],
                        width: 24,
                        height: 24
                    }
                ]
            }
        ]
    };
}
