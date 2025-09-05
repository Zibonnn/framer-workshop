import React from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion, useMotionValue, useTransform } from "framer-motion"
import FormBuilder from "./FormBuilderOrg"
import Button from "./Button"

interface LinkingExampleProps {
    formFieldType: "text" | "textarea" | "dropdown" | "radio" | "chips"
    formLabel: string
    formPlaceholder: string
    buttonText: string
    buttonVariant: "primary" | "secondary" | "outline" | "ghost" | "danger"
    layout: "side-by-side" | "stacked" | "separate"
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function LinkingExample(props: LinkingExampleProps) {
    const {
        formFieldType = "text",
        formLabel = "Email Address",
        formPlaceholder = "Enter your email...",
        buttonText = "Subscribe",
        buttonVariant = "primary",
        layout = "side-by-side",
    } = props

    // Motion values for linking
    const formState = useMotionValue({ hasContent: false, disabled: true })
    const buttonDisabled = useTransform(formState, (state) => state.disabled)

    const getLayoutStyles = () => {
        switch (layout) {
            case "side-by-side":
                return {
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                }
            case "stacked":
                return {
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "16px",
                }
            case "separate":
                return {
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "32px",
                }
            default:
                return {
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                }
        }
    }

    return (
        <div style={getLayoutStyles()}>
            <div style={{ flex: 1 }}>
                <FormBuilder
                    fieldType={formFieldType}
                    label={formLabel}
                    showLabel={true}
                    placeholder={formPlaceholder}
                    placeholderColor="#9CA3AF"
                    required={true}
                    showChips={true}
                    chipSuggestions={["user@example.com", "admin@company.com", "test@demo.com"]}
                    backgroundColor="#FFFFFF"
                    borderColor="#E5E7EB"
                    focusColor="#3B82F6"
                    textColor="#111827"
                    labelColor="#374151"
                    borderRadius="8px"
                    heightMode="fixed"
                    height={40}
                    padding="12px 16px"
                    showClearButton={true}
                    clearButtonColor="#9CA3AF"
                    showButton={false}
                />
            </div>
            
            <div style={{ flex: layout === "side-by-side" ? "0 0 auto" : "1" }}>
                <Button
                    text={buttonText}
                    variant={buttonVariant}
                    size="medium"
                    disabled={false}
                    loading={false}
                    fullWidth={layout !== "side-by-side"}
                    externalDisabled={false}
                    borderRadius="8px"
                    padding="12px 24px"
                />
            </div>
        </div>
    )
}

addPropertyControls(LinkingExample, {
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
    layout: {
        type: ControlType.Enum,
        title: "Layout",
        options: ["side-by-side", "stacked", "separate"],
        optionTitles: ["Side by Side", "Stacked", "Separate"],
        defaultValue: "side-by-side",
    },
})
