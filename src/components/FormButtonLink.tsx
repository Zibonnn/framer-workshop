// Simple approach using Framer's data binding and motion values
import { useState, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion, useMotionValue, useTransform } from "framer-motion"
import FormBuilder from "./FormBuilder"
import Button from "./Button"

interface FormButtonLinkProps {
    // Form properties
    formLabel: string
    formPlaceholder: string
    formFieldType: "text" | "textarea" | "dropdown" | "radio" | "chips"
    
    // Button properties
    buttonText: string
    buttonVariant: "primary" | "secondary" | "outline"
    buttonSize: "small" | "medium" | "large"
    
    // Link properties
    linkBehavior: "animate" | "disable" | "enable" | "pulse"
    animationDuration: number
    
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function FormButtonLink(props: FormButtonLinkProps) {
    const {
        formLabel = "Your Message",
        formPlaceholder = "Type something...",
        formFieldType = "text",
        buttonText = "Submit",
        buttonVariant = "primary",
        buttonSize = "medium",
        linkBehavior = "animate",
        animationDuration = 0.5,
        style
    } = props

    const [formValue, setFormValue] = useState("")
    const [buttonEnabled, setButtonEnabled] = useState(true)
    const [isAnimating, setIsAnimating] = useState(false)

    // Motion values for animations
    const scale = useMotionValue(1)
    const opacity = useMotionValue(1)
    const rotate = useMotionValue(0)

    // Transform values
    const buttonScale = useTransform(scale, [0.8, 1.2], [0.8, 1.2])
    const buttonOpacity = useTransform(opacity, [0.5, 1], [0.5, 1])

    const handleFormSubmit = useCallback(() => {
        console.log("Form submitted:", formValue)
        
        switch (linkBehavior) {
            case "animate":
                setIsAnimating(true)
                scale.set(1.2)
                rotate.set(360)
                opacity.set(0.7)
                
                setTimeout(() => {
                    scale.set(1)
                    rotate.set(0)
                    opacity.set(1)
                    setIsAnimating(false)
                }, animationDuration * 1000)
                break
                
            case "disable":
                setButtonEnabled(false)
                setTimeout(() => setButtonEnabled(true), 2000)
                break
                
            case "enable":
                setButtonEnabled(true)
                break
                
            case "pulse":
                setIsAnimating(true)
                scale.set(1.1)
                setTimeout(() => {
                    scale.set(1)
                    setIsAnimating(false)
                }, 200)
                break
        }
    }, [formValue, linkBehavior, animationDuration, scale, rotate, opacity])

    const handleFormChange = useCallback((value: string) => {
        setFormValue(value)
        
        // Auto-enable/disable button based on form content
        if (linkBehavior === "enable" || linkBehavior === "disable") {
            setButtonEnabled(value.trim().length > 0)
        }
    }, [linkBehavior])

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "20px",
            padding: "20px",
            ...style 
        }}>
            <FormBuilder
                fieldType={formFieldType}
                label={formLabel}
                placeholder={formPlaceholder}
                showButton={true}
                buttonText="Submit Form"
                onButtonClick={handleFormSubmit}
                // Note: This would need to be implemented in FormBuilder
                // onValueChange={handleFormChange}
            />
            
            <motion.div
                animate={{
                    scale: buttonScale,
                    opacity: buttonOpacity,
                    rotate: rotate
                }}
                transition={{
                    duration: animationDuration,
                    ease: "easeInOut"
                }}
            >
                <Button
                    text={isAnimating ? "Processing..." : buttonText}
                    variant={buttonVariant}
                    size={buttonSize}
                    disabled={!buttonEnabled}
                    onClick={() => {
                        if (linkBehavior === "pulse") {
                            handleFormSubmit()
                        }
                    }}
                />
            </motion.div>
            
            {/* Debug info */}
            <div style={{ 
                fontSize: "12px", 
                color: "#666",
                textAlign: "center",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px"
            }}>
                Form Value: "{formValue}" | Button Enabled: {buttonEnabled ? "Yes" : "No"} | Animating: {isAnimating ? "Yes" : "No"}
            </div>
        </div>
    )
}

addPropertyControls(FormButtonLink, {
    formLabel: {
        type: ControlType.String,
        title: "Form Label",
        defaultValue: "Your Message"
    },
    formPlaceholder: {
        type: ControlType.String,
        title: "Form Placeholder",
        defaultValue: "Type something..."
    },
    formFieldType: {
        type: ControlType.Enum,
        title: "Field Type",
        options: ["text", "textarea", "dropdown", "radio", "chips"],
        optionTitles: ["Text", "Text Area", "Dropdown", "Radio", "Chips"],
        defaultValue: "text"
    },
    buttonText: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Submit"
    },
    buttonVariant: {
        type: ControlType.Enum,
        title: "Button Variant",
        options: ["primary", "secondary", "outline"],
        optionTitles: ["Primary", "Secondary", "Outline"],
        defaultValue: "primary"
    },
    buttonSize: {
        type: ControlType.Enum,
        title: "Button Size",
        options: ["small", "medium", "large"],
        optionTitles: ["Small", "Medium", "Large"],
        defaultValue: "medium"
    },
    linkBehavior: {
        type: ControlType.Enum,
        title: "Link Behavior",
        options: ["animate", "disable", "enable", "pulse"],
        optionTitles: ["Animate", "Disable", "Enable", "Pulse"],
        defaultValue: "animate"
    },
    animationDuration: {
        type: ControlType.Number,
        title: "Animation Duration",
        defaultValue: 0.5,
        min: 0.1,
        max: 2,
        step: 0.1,
        unit: "s",
        hidden: ({ linkBehavior }) => linkBehavior !== "animate"
    }
})
