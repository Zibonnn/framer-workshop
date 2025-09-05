import React from "react"
import { addPropertyControls, ControlType } from "framer"
import FormBuilderWorking from "./FormBuilderWorking"
import ButtonWorking from "./ButtonWorking"

interface WorkingLinkingExampleProps {
    formId: string
    buttonId: string
    showInstructions: boolean
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function WorkingLinkingExample(props: WorkingLinkingExampleProps) {
    const {
        formId = "working-form-123",
        buttonId = "working-button-456",
        showInstructions = true,
    } = props

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "20px",
            border: "2px solid #E5E7EB",
            borderRadius: "12px",
            backgroundColor: "#F9FAFB"
        }}>
            {showInstructions && (
                <div style={{
                    padding: "12px",
                    backgroundColor: "#10B981",
                    color: "white",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "14px"
                }}>
                    ✅ Working ID-Based Linking
                </div>
            )}
            
            <div style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-start"
            }}>
                <div style={{ flex: 1 }}>
                    <FormBuilderWorking
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
                    />
                </div>
                
                <div style={{ flex: "0 0 auto" }}>
                    <ButtonWorking
                        text="Subscribe"
                        variant="primary"
                        size="medium"
                        disabled={false}
                        loading={false}
                        fullWidth={false}
                        externalDisabled={false}
                        borderRadius="8px"
                        padding="12px 24px"
                        linkedFormId={formId}
                    />
                </div>
            </div>

            <div style={{
                padding: "8px 12px",
                backgroundColor: "#F3F4F6",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#6B7280",
                fontFamily: "monospace"
            }}>
                <strong>Form ID:</strong> {formId} | <strong>Button ID:</strong> {buttonId}
                <br />
                <strong>Status:</strong> Button will enable/disable based on form content
            </div>
        </div>
    )
}

addPropertyControls(WorkingLinkingExample, {
    formId: {
        type: ControlType.String,
        title: "Form ID",
        defaultValue: "working-form-123",
        description: "Unique identifier for the form component",
    },
    buttonId: {
        type: ControlType.String,
        title: "Button ID",
        defaultValue: "working-button-456",
        description: "Unique identifier for the button component",
    },
    showInstructions: {
        type: ControlType.Boolean,
        title: "Show Instructions",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
})
