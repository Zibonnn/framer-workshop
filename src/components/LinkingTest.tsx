import React from "react"
import { addPropertyControls, ControlType } from "framer"
import FormBuilder from "./FormBuilderOrg"
import Button from "./Button"

interface LinkingTestProps {
    testMode: "simple" | "advanced" | "custom"
    formId: string
    buttonId: string
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function LinkingTest(props: LinkingTestProps) {
    const {
        testMode = "simple",
        formId = "test-form",
        buttonId = "test-button",
    } = props

    const getTestConfig = () => {
        switch (testMode) {
            case "simple":
                return {
                    formId: "simple-form",
                    buttonId: "simple-button",
                    formLabel: "Simple Test",
                    buttonText: "Test Link"
                }
            case "advanced":
                return {
                    formId: "advanced-form",
                    buttonId: "advanced-button", 
                    formLabel: "Advanced Test",
                    buttonText: "Advanced Link"
                }
            case "custom":
                return {
                    formId,
                    buttonId,
                    formLabel: "Custom Test",
                    buttonText: "Custom Link"
                }
            default:
                return {
                    formId: "default-form",
                    buttonId: "default-button",
                    formLabel: "Default Test",
                    buttonText: "Default Link"
                }
        }
    }

    const config = getTestConfig()

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
            <div style={{
                padding: "12px",
                backgroundColor: "#3B82F6",
                color: "white",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "600"
            }}>
                🔗 ID-Based Linking Test
            </div>
            
            <div style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-start"
            }}>
                <div style={{ flex: 1 }}>
                    <FormBuilder
                        fieldType="text"
                        label={config.formLabel}
                        showLabel={true}
                        placeholder="Type to test linking..."
                        placeholderColor="#9CA3AF"
                        required={true}
                        showChips={true}
                        chipSuggestions={["test1", "test2", "test3"]}
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
                        componentId={config.formId}
                        linkedButtonId={config.buttonId}
                    />
                </div>
                
                <div style={{ flex: "0 0 auto" }}>
                    <Button
                        text={config.buttonText}
                        variant="primary"
                        size="medium"
                        disabled={false}
                        loading={false}
                        fullWidth={false}
                        externalDisabled={false}
                        borderRadius="8px"
                        padding="12px 24px"
                        componentId={config.buttonId}
                        linkedFormId={config.formId}
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
                <strong>Form ID:</strong> {config.formId} | <strong>Button ID:</strong> {config.buttonId}
            </div>
        </div>
    )
}

addPropertyControls(LinkingTest, {
    testMode: {
        type: ControlType.Enum,
        title: "Test Mode",
        options: ["simple", "advanced", "custom"],
        optionTitles: ["Simple", "Advanced", "Custom"],
        defaultValue: "simple",
    },
    formId: {
        type: ControlType.String,
        title: "Custom Form ID",
        defaultValue: "test-form",
        description: "Custom form ID (only used in custom mode)",
        hidden: ({ testMode }) => testMode !== "custom",
    },
    buttonId: {
        type: ControlType.String,
        title: "Custom Button ID",
        defaultValue: "test-button",
        description: "Custom button ID (only used in custom mode)",
        hidden: ({ testMode }) => testMode !== "custom",
    },
})
