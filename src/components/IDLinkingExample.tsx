import React, { useState } from "react"
import { addPropertyControls, ControlType } from "framer"
import FormBuilder from "./FormBuilderOrg"
import Button from "./Button"

interface IDLinkingExampleProps {
    formId: string
    buttonId: string
    showInstructions: boolean
    layout: "side-by-side" | "stacked" | "separate"
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function IDLinkingExample(props: IDLinkingExampleProps) {
    const {
        formId = "my-form-123",
        buttonId = "my-button-456",
        showInstructions = true,
        layout = "side-by-side",
    } = props

    const [isLinked, setIsLinked] = useState(false)

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
            {showInstructions && (
                <div style={{
                    padding: "16px",
                    backgroundColor: "#F3F4F6",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    color: "#374151"
                }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "600" }}>
                        🔗 ID-Based Linking Instructions:
                    </h4>
                    <ol style={{ margin: "0", paddingLeft: "20px" }}>
                        <li><strong>Form ID:</strong> {formId}</li>
                        <li><strong>Button ID:</strong> {buttonId}</li>
                        <li>Copy these IDs to link components anywhere in Framer</li>
                        <li>Works across frames, pages, and nesting levels!</li>
                    </ol>
                </div>
            )}

            <div style={{ flex: 1 }}>
                <FormBuilder
                    fieldType="text"
                    label="Email Address"
                    showLabel={true}
                    placeholder="Enter your email..."
                    placeholderColor="#9CA3AF"
                    required={true}
                    showChips={true}
                    chipSuggestions={["user@example.com", "admin@company.com"]}
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
                    componentId={formId}
                    linkedButtonId={buttonId}
                />
            </div>
            
            <div style={{ flex: layout === "side-by-side" ? "0 0 auto" : "1" }}>
                <Button
                    text="Subscribe"
                    variant="primary"
                    size="medium"
                    disabled={false}
                    loading={false}
                    fullWidth={layout !== "side-by-side"}
                    externalDisabled={false}
                    borderRadius="8px"
                    padding="12px 24px"
                    componentId={buttonId}
                    linkedFormId={formId}
                />
            </div>
        </div>
    )
}

addPropertyControls(IDLinkingExample, {
    formId: {
        type: ControlType.String,
        title: "Form ID",
        defaultValue: "my-form-123",
        description: "Unique identifier for the form component",
    },
    buttonId: {
        type: ControlType.String,
        title: "Button ID",
        defaultValue: "my-button-456",
        description: "Unique identifier for the button component",
    },
    showInstructions: {
        type: ControlType.Boolean,
        title: "Show Instructions",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    layout: {
        type: ControlType.Enum,
        title: "Layout",
        options: ["side-by-side", "stacked", "separate"],
        optionTitles: ["Side by Side", "Stacked", "Separate"],
        defaultValue: "side-by-side",
    },
})
