import React, { useState, useCallback, startTransition, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { useMotionValue } from "framer-motion"
import { type CSSProperties } from "react"

interface ButtonWorkingProps {
    text: string
    variant: "primary" | "secondary" | "outline" | "ghost" | "danger" | "custom"
    size: "small" | "medium" | "large"
    disabled: boolean
    loading: boolean
    fullWidth: boolean
    externalDisabled?: boolean
    linkedFormId?: string
    showIcon: boolean
    icon: any
    iconPosition: "left" | "right"
    iconSize: number
    iconColor: string
    backgroundColor: string
    textColor: string
    borderColor: string
    borderRadius: string
    padding: string
    font: any
    onClick: () => void
}

// Global state for component communication
let globalState: any = {}

// Helper function to set component data
const setComponentData = (id: string, type: 'form' | 'button', data: any) => {
    globalState[id] = { id, type, ...data }
    console.log(`Button: Set data for ${id}:`, data)
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function ButtonWorking(props: ButtonWorkingProps) {
    const {
        text = "Button",
        variant = "primary",
        size = "medium",
        disabled = false,
        loading = false,
        fullWidth = false,
        externalDisabled = false,
        linkedFormId = "",
        showIcon = false,
        icon,
        iconPosition = "left",
        iconSize = 16,
        iconColor = "#FFFFFF",
        backgroundColor = "#000000",
        textColor = "#FFFFFF",
        borderColor = "#000000",
        borderRadius = "8px",
        padding = "12px 24px",
        font,
        onClick,
    } = props

    const [isHovered, setIsHovered] = useState(false)
    const [isExternallyDisabled, setIsExternallyDisabled] = useState(false)

    // Motion values for linking
    const disabledMotion = useMotionValue(disabled || externalDisabled)
    const formDataMotion = useMotionValue({ hasContent: false, value: "" })

    // Register this button with the global state
    useEffect(() => {
        const buttonId = "button-" + Math.random().toString(36).substr(2, 9)
        setComponentData(buttonId, 'button', {
            linkedFormId,
            updateExternalDisabled: setIsExternallyDisabled
        })
    }, [linkedFormId])

    // Check if form has content and update external disabled state
    useEffect(() => {
        if (linkedFormId && globalState[linkedFormId]) {
            const formData = globalState[linkedFormId]
            if (formData.hasContent !== undefined) {
                setIsExternallyDisabled(!formData.hasContent)
                console.log(`Button: Form ${linkedFormId} has content:`, formData.hasContent)
            }
        }
    }, [linkedFormId])

    // Listen for form changes
    useEffect(() => {
        if (linkedFormId) {
            const checkFormState = () => {
                if (globalState[linkedFormId]) {
                    const formData = globalState[linkedFormId]
                    setIsExternallyDisabled(!formData.hasContent)
                }
            }
            
            // Check immediately
            checkFormState()
            
            // Check periodically (simple polling approach)
            const interval = setInterval(checkFormState, 100)
            
            return () => clearInterval(interval)
        }
    }, [linkedFormId])

    const isDisabled = disabled || externalDisabled || isExternallyDisabled

    const handleClick = useCallback(() => {
        if (!isDisabled && !loading && onClick) {
            startTransition(() => onClick())
        }
    }, [isDisabled, loading, onClick])

    const getVariantStyles = () => {
        switch (variant) {
            case "primary":
                return {
                    backgroundColor: "#3B82F6",
                    color: "#FFFFFF",
                    border: "1px solid #3B82F6",
                }
            case "secondary":
                return {
                    backgroundColor: "#6B7280",
                    color: "#FFFFFF",
                    border: "1px solid #6B7280",
                }
            case "outline":
                return {
                    backgroundColor: "transparent",
                    color: "#3B82F6",
                    border: "1px solid #3B82F6",
                }
            case "ghost":
                return {
                    backgroundColor: "transparent",
                    color: "#3B82F6",
                    border: "1px solid transparent",
                }
            case "danger":
                return {
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    border: "1px solid #EF4444",
                }
            case "custom":
                return {
                    backgroundColor: backgroundColor,
                    color: textColor,
                    border: `1px solid ${borderColor}`,
                }
            default:
                return {
                    backgroundColor: "#3B82F6",
                    color: "#FFFFFF",
                    border: "1px solid #3B82F6",
                }
        }
    }

    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    padding: "8px 16px",
                    fontSize: "12px",
                }
            case "medium":
                return {
                    padding: "12px 24px",
                    fontSize: "14px",
                }
            case "large":
                return {
                    padding: "16px 32px",
                    fontSize: "16px",
                }
            default:
                return {
                    padding: "12px 24px",
                    fontSize: "14px",
                }
        }
    }

    const variantStyles = getVariantStyles()
    const sizeStyles = getSizeStyles()

    const buttonStyles: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: fullWidth ? "100%" : "auto",
        padding: padding,
        border: variantStyles.border,
        borderRadius: borderRadius,
        backgroundColor: isDisabled ? "#CCCCCC" : variantStyles.backgroundColor,
        color: isDisabled ? "#666666" : variantStyles.color,
        fontSize: sizeStyles.fontSize,
        fontWeight: "500",
        cursor: isDisabled ? "not-allowed" : "pointer",
        outline: "none",
        transition: "all 0.2s ease",
        opacity: loading ? 0.7 : 1,
        ...font,
    }

    const renderIcon = () => {
        if (!showIcon || !icon) return null

        const iconStyle: CSSProperties = {
            width: iconSize,
            height: iconSize,
            color: iconColor,
        }

        return (
            <div style={iconStyle}>
                {icon}
            </div>
        )
    }

    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={buttonStyles}
        >
            {showIcon && iconPosition === "left" && renderIcon()}
            {loading ? "Loading..." : text}
            {showIcon && iconPosition === "right" && renderIcon()}
        </button>
    )
}

addPropertyControls(ButtonWorking, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Button",
    },
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["primary", "secondary", "outline", "ghost", "danger", "custom"],
        optionTitles: ["Primary", "Secondary", "Outline", "Ghost", "Danger", "Custom"],
        defaultValue: "primary",
    },
    size: {
        type: ControlType.Enum,
        title: "Size",
        options: ["small", "medium", "large"],
        optionTitles: ["Small", "Medium", "Large"],
        defaultValue: "medium",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    externalDisabled: {
        type: ControlType.Boolean,
        title: "External Disabled",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
        description: "This will be controlled by the linked form automatically",
    },
    linkedFormId: {
        type: ControlType.String,
        title: "Linked Form ID",
        defaultValue: "",
        description: "Enter the Form's Component ID to link them (works anywhere in Framer)",
    },
    showIcon: {
        type: ControlType.Boolean,
        title: "Show Icon",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    iconPosition: {
        type: ControlType.Enum,
        title: "Icon Position",
        options: ["left", "right"],
        optionTitles: ["Left", "Right"],
        defaultValue: "left",
        hidden: ({ showIcon }) => !showIcon,
    },
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        defaultValue: 16,
        min: 8,
        max: 32,
        hidden: ({ showIcon }) => !showIcon,
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon Color",
        defaultValue: "#FFFFFF",
        hidden: ({ showIcon }) => !showIcon,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background Color",
        defaultValue: "#000000",
        hidden: ({ variant }) => variant !== "custom",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#FFFFFF",
        hidden: ({ variant }) => variant !== "custom",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "#000000",
        hidden: ({ variant }) => variant !== "custom",
    },
    borderRadius: {
        type: ControlType.BorderRadius,
        title: "Border Radius",
        defaultValue: "8px",
    },
    padding: {
        type: ControlType.Padding,
        title: "Padding",
        defaultValue: "12px 24px",
    },
    fullWidth: {
        type: ControlType.Boolean,
        title: "Full Width",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    loading: {
        type: ControlType.Boolean,
        title: "Loading",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    onClick: {
        type: ControlType.EventHandler,
        title: "On Click",
    },
})
