import React from "react"
import { addPropertyControls, ControlType } from "framer"
import FormBuilder from "./FormBuilderOrg"
import Button from "./Button"

interface FormWithButtonProps {
    formFieldType: "text" | "textarea" | "dropdown" | "radio" | "chips"
    formLabel: string
    formPlaceholder: string
    buttonText: string
    buttonVariant: "primary" | "secondary" | "outline" | "ghost" | "danger"
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function FormWithButton(props: FormWithButtonProps) {
    const {
        formFieldType = "text",
        formLabel = "Email Address",
        formPlaceholder = "Enter your email...",
        buttonText = "Subscribe",
        buttonVariant = "primary",
    } = props

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
            <FormBuilder
                fieldType={formFieldType}
                label={formLabel}
                placeholder={formPlaceholder}
                showButton={false}
                showChips={true}
                chipSuggestions={["example@email.com", "test@company.com", "user@domain.com"]}
            />
            <Button
                text={buttonText}
                variant={buttonVariant}
                fullWidth={true}
                externalDisabled={false} // This would be controlled by the form state
            />
        </div>
    )
}

addPropertyControls(FormWithButton, {
    formFieldType: {
        type: ControlType.Enum,
        title: "Field Type",
        options: ["text", "textarea", "dropdown", "radio", "chips"],
        optionTitles: ["Text", "Text Area", "Dropdown", "Radio", "Chips"],
        defaultValue: "text",
    },
    formLabel: {
        type: ControlType.String,
        title: "Form Label",
        defaultValue: "Email Address",
    },
    formPlaceholder: {
        type: ControlType.String,
        title: "Form Placeholder",
        defaultValue: "Enter your email...",
    },
    buttonText: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Subscribe",
    },
    buttonVariant: {
        type: ControlType.Enum,
        title: "Button Variant",
        options: ["primary", "secondary", "outline", "ghost", "danger"],
        optionTitles: ["Primary", "Secondary", "Outline", "Ghost", "Danger"],
        defaultValue: "primary",
    },
})
