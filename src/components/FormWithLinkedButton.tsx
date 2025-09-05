// Example component showing how to link FormBuilder with Button using Framer Motion
import { useState, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion, useAnimation } from "framer-motion"
import FormBuilder from "./FormBuilder"
import Button from "./Button"

interface FormWithLinkedButtonProps {
    formProps: any
    buttonProps: any
    linkType: "motion" | "state" | "event"
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function FormWithLinkedButton(props: FormWithLinkedButtonProps) {
    const {
        formProps = {},
        buttonProps = {},
        linkType = "motion",
        style
    } = props

    const [buttonState, setButtonState] = useState({
        enabled: true,
        loading: false,
        clicked: false
    })

    const buttonControls = useAnimation()

    const handleFormSubmit = useCallback((formValue: string) => {
        console.log("Form submitted:", formValue)
        
        switch (linkType) {
            case "motion":
                // Animate the button
                buttonControls.start({
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                })
                break
                
            case "state":
                // Change button state
                setButtonState(prev => ({
                    ...prev,
                    loading: true,
                    clicked: true
                }))
                
                // Simulate loading
                setTimeout(() => {
                    setButtonState(prev => ({
                        ...prev,
                        loading: false
                    }))
                }, 2000)
                break
                
            case "event":
                // Trigger button click
                setButtonState(prev => ({
                    ...prev,
                    clicked: !prev.clicked
                }))
                break
        }
    }, [linkType, buttonControls])

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "20px",
            ...style 
        }}>
            <FormBuilder
                {...formProps}
                showButton={true}
                buttonText="Submit Form"
                onButtonClick={() => handleFormSubmit("form submitted")}
            />
            
            <motion.div animate={buttonControls}>
                <Button
                    {...buttonProps}
                    text={buttonState.loading ? "Loading..." : buttonProps.text || "Linked Button"}
                    disabled={!buttonState.enabled || buttonState.loading}
                    onClick={() => {
                        if (linkType === "event") {
                            setButtonState(prev => ({
                                ...prev,
                                clicked: !prev.clicked
                            }))
                        }
                    }}
                />
            </motion.div>
            
            {linkType === "state" && (
                <div style={{ 
                    fontSize: "12px", 
                    color: "#666",
                    textAlign: "center"
                }}>
                    Button clicked: {buttonState.clicked ? "Yes" : "No"}
                    {buttonState.loading && " | Loading..."}
                </div>
            )}
        </div>
    )
}

addPropertyControls(FormWithLinkedButton, {
    linkType: {
        type: ControlType.Enum,
        title: "Link Type",
        options: ["motion", "state", "event"],
        optionTitles: ["Motion Animation", "State Change", "Event Trigger"],
        defaultValue: "motion"
    },
    formProps: {
        type: ControlType.Object,
        title: "Form Settings",
        controls: {
            fieldType: {
                type: ControlType.Enum,
                title: "Field Type",
                options: ["text", "textarea", "dropdown", "radio", "chips"],
                optionTitles: ["Text", "Text Area", "Dropdown", "Radio", "Chips"],
                defaultValue: "text"
            },
            label: {
                type: ControlType.String,
                title: "Label",
                defaultValue: "Enter your message"
            },
            placeholder: {
                type: ControlType.String,
                title: "Placeholder",
                defaultValue: "Type something..."
            }
        }
    },
    buttonProps: {
        type: ControlType.Object,
        title: "Button Settings",
        controls: {
            text: {
                type: ControlType.String,
                title: "Button Text",
                defaultValue: "Submit"
            },
            variant: {
                type: ControlType.Enum,
                title: "Variant",
                options: ["primary", "secondary", "outline"],
                optionTitles: ["Primary", "Secondary", "Outline"],
                defaultValue: "primary"
            },
            size: {
                type: ControlType.Enum,
                title: "Size",
                options: ["small", "medium", "large"],
                optionTitles: ["Small", "Medium", "Large"],
                defaultValue: "medium"
            }
        }
    }
})
