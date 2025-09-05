import React, { useState, useCallback, startTransition, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { useMotionValue } from "framer-motion"
import { type CSSProperties } from "react"
import { subscribeToComponent, unsubscribeFromComponent } from "./SimpleGlobalState"

interface ButtonProps {
    text: string
    variant: "primary" | "secondary" | "outline" | "ghost" | "danger" | "custom"
    size: "small" | "medium" | "large"
    disabled: boolean
    loading: boolean
    fullWidth: boolean
    externalDisabled?: boolean
    linkedForm?: any
    componentId?: string
    linkedFormId?: string
    showIcon: boolean
    icon: any
    iconPosition: "left" | "right"
    iconSize: number
    iconColor: string
    backgroundColor: string
    textColor: string
    borderColor: string
    hoverBackgroundColor: string
    hoverTextColor: string
    hoverBorderColor: string
    borderRadius: string
    padding: string
    font: any
    style?: CSSProperties
    onClick?: () => void
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function Button(props: ButtonProps) {
    const {
        text = "Button",
        variant = "primary",
        size = "medium",
        disabled = false,
        loading = false,
        fullWidth = false,
        externalDisabled = false,
        linkedForm,
        linkedFormId = "",
        showIcon = false,
        icon,
        iconPosition = "left",
        iconSize = 16,
        iconColor = "#FFFFFF",
        backgroundColor = "#000000",
        textColor = "#FFFFFF",
        borderColor = "#000000",
        hoverBackgroundColor = "#333333",
        hoverTextColor = "#FFFFFF",
        hoverBorderColor = "#333333",
        borderRadius = "8px",
        padding = "12px 24px",
        font,
        onClick,
    } = props

    const [isHovered, setIsHovered] = useState(false)

    // Motion values for linking
    const disabledMotion = useMotionValue(disabled || externalDisabled)
    const formDataMotion = useMotionValue({ hasContent: false, value: "" })

    const isDisabled = disabled || externalDisabled

    // Component linking system
    // const { createLink } = useComponentLink({
    //     id: componentId,
    //     type: 'button',
    //     data: {
    //         disabled: isDisabled,
    //         text,
    //         variant,
    //         hasContent: false // Will be updated by linked form
    //     },
    //     onDataUpdate: (data) => {
    //         // Handle updates from linked form
    //         if (data.hasContent !== undefined) {
    //             // Update button state based on form content
    //             console.log('Button received form update:', data)
    //         }
    //     }
    // })

    // Auto-link with form if ID is provided
    useEffect(() => {
        if (linkedFormId && linkedFormId.trim() !== '') {
            // Subscribe to form updates
            const handleFormUpdate = (formData: any) => {
                // Update button state based on form data
                console.log('Button received form update:', formData)
            }
            
            subscribeToComponent(linkedFormId, handleFormUpdate)
            
            return () => {
                unsubscribeFromComponent(linkedFormId, handleFormUpdate)
            }
        }
    }, [linkedFormId])

    // Sync with linked form if provided (legacy method)
    useEffect(() => {
        if (linkedForm && linkedForm.get) {
            const formData = linkedForm.get()
            if (formData) {
                disabledMotion.set(formData.disabled || false)
                formDataMotion.set({
                    hasContent: formData.hasContent || false,
                    value: formData.value || ""
                })
            }
        }
    }, [linkedForm, disabledMotion, formDataMotion])

    const handleClick = useCallback(() => {
        if (!isDisabled && !loading && onClick) {
            startTransition(() => onClick())
        }
    }, [isDisabled, loading, onClick])

    const handleMouseEnter = useCallback(() => {
        startTransition(() => setIsHovered(true))
    }, [])

    const handleMouseLeave = useCallback(() => {
        startTransition(() => setIsHovered(false))
    }, [])

    const getVariantStyles = () => {
        // Define variant-specific colors
        const getVariantColors = () => {
            switch (variant) {
                case "primary":
                    return {
                        bg: "#000000",
                        text: "#FFFFFF",
                        border: "#000000",
                        hoverBg: "#333333",
                        hoverText: "#FFFFFF",
                        hoverBorder: "#333333",
                    }
                case "secondary":
                    return {
                        bg: "#F5F5F5",
                        text: "#000000",
                        border: "#F5F5F5",
                        hoverBg: "#E5E5E5",
                        hoverText: "#000000",
                        hoverBorder: "#E5E5E5",
                    }
                case "outline":
                    return {
                        bg: "transparent",
                        text: "#000000",
                        border: "#000000",
                        hoverBg: "#000000",
                        hoverText: "#FFFFFF",
                        hoverBorder: "#000000",
                    }
                case "ghost":
                    return {
                        bg: "transparent",
                        text: "#000000",
                        border: "transparent",
                        hoverBg: "#F5F5F5",
                        hoverText: "#000000",
                        hoverBorder: "transparent",
                    }
                case "danger":
                    return {
                        bg: "#FF4444",
                        text: "#FFFFFF",
                        border: "#FF4444",
                        hoverBg: "#CC3333",
                        hoverText: "#FFFFFF",
                        hoverBorder: "#CC3333",
                    }
                default:
                    return {
                        bg: backgroundColor,
                        text: textColor,
                        border: borderColor,
                        hoverBg: hoverBackgroundColor,
                        hoverText: hoverTextColor,
                        hoverBorder: hoverBorderColor,
                    }
            }
        }

        const colors = getVariantColors()
        
        const baseStyles = {
            backgroundColor: isDisabled ? "#CCCCCC" : colors.bg,
            color: isDisabled ? "#666666" : colors.text,
            border: `1px solid ${isDisabled ? "#CCCCCC" : colors.border}`,
        }

        if (isHovered && !isDisabled) {
            return {
                ...baseStyles,
                backgroundColor: colors.hoverBg,
                color: colors.hoverText,
                border: `1px solid ${colors.hoverBorder}`,
            }
        }

        return baseStyles
    }

    const getSizeMultiplier = () => {
        switch (size) {
            case "small": return 0.75
            case "large": return 1.25
            default: return 1
        }
    }

    const parsePadding = () => {
        const paddingValues = padding.split(' ').map(p => parseInt(p.replace('px', '')))
        const [top, right, bottom, left] = paddingValues.length === 1 
            ? [paddingValues[0], paddingValues[0], paddingValues[0], paddingValues[0]]
            : paddingValues.length === 2
            ? [paddingValues[0], paddingValues[1], paddingValues[0], paddingValues[1]]
            : paddingValues.length === 4
            ? paddingValues
            : [12, 24, 12, 24] // fallback

        const multiplier = getSizeMultiplier()
        return {
            paddingTop: `${top * multiplier}px`,
            paddingRight: `${right * multiplier}px`,
            paddingBottom: `${bottom * multiplier}px`,
            paddingLeft: `${left * multiplier}px`,
        }
    }

    const variantStyles = getVariantStyles()
    const paddingStyles = parsePadding()

    const buttonStyles: CSSProperties = {
        ...paddingStyles,
        ...variantStyles,
        borderRadius: borderRadius,
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: isDisabled || loading ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        outline: "none",
        ...font,
        fontSize: font?.fontSize || (size === "small" ? "12px" : size === "large" ? "16px" : "14px"),
        fontWeight: font?.fontWeight || "500",
        letterSpacing: font?.letterSpacing || "0",
        lineHeight: font?.lineHeight || "1.2em",
    }

    const renderIcon = () => {
        if (!showIcon || !icon) return null

        const iconStyle: CSSProperties = {
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            color: isDisabled ? "#666666" : iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }

        return <div style={iconStyle}>{icon}</div>
    }

    const renderLoadingSpinner = () => {
        if (!loading) return null

        return (
            <div
                style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    border: `2px solid transparent`,
                    borderTop: `2px solid ${isDisabled ? "#666666" : textColor}`,
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                }}
            />
        )
    }

    return (
        <>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <button
                style={{
                    ...buttonStyles,
                    ...props.style,
                }}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                disabled={isDisabled || loading}
                type="button"
            >
                {showIcon && iconPosition === "left" && renderIcon()}
                {loading ? renderLoadingSpinner() : text}
                {showIcon && iconPosition === "right" && renderIcon()}
            </button>
        </>
    )
}

addPropertyControls(Button, {
    // === BASIC SETTINGS ===
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
    },
    linkedForm: {
        type: ControlType.ComponentInstance,
        title: "Linked Form",
        description: "Link to a FormBuilder component anywhere in your project",
    },
    componentId: {
        type: ControlType.String,
        title: "Component ID",
        defaultValue: "button-123",
        description: "Unique identifier for this button (auto-generated if empty)",
    },
    linkedFormId: {
        type: ControlType.String,
        title: "Linked Form ID",
        defaultValue: "",
        description: "Enter the Form's Component ID to link them (works anywhere in Framer)",
    },
    loading: {
        type: ControlType.Boolean,
        title: "Loading",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    fullWidth: {
        type: ControlType.Boolean,
        title: "Full Width",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },

    // === ICON SETTINGS ===
    showIcon: {
        type: ControlType.Boolean,
        title: "Show Icon",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    icon: {
        type: ControlType.ComponentInstance,
        title: "Icon",
        hidden: ({ showIcon }) => !showIcon,
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
        min: 12,
        max: 24,
        step: 1,
        unit: "px",
        hidden: ({ showIcon }) => !showIcon,
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon Color",
        defaultValue: "#FFFFFF",
        hidden: ({ showIcon }) => !showIcon,
    },

    // === CUSTOM STYLING (only shown for custom variant) ===
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
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
    hoverBackgroundColor: {
        type: ControlType.Color,
        title: "Hover Background",
        defaultValue: "#333333",
        hidden: ({ variant }) => variant !== "custom",
    },
    hoverTextColor: {
        type: ControlType.Color,
        title: "Hover Text",
        defaultValue: "#FFFFFF",
        hidden: ({ variant }) => variant !== "custom",
    },
    hoverBorderColor: {
        type: ControlType.Color,
        title: "Hover Border",
        defaultValue: "#333333",
        hidden: ({ variant }) => variant !== "custom",
    },

    // === LAYOUT & STYLING ===
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

    // === TYPOGRAPHY ===
    font: {
        type: ControlType.Font,
        title: "Font",
        defaultValue: {
            fontSize: "14px",
            variant: "Medium",
            letterSpacing: "0",
            lineHeight: "1.2em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
    },

    // === EVENTS ===
    onClick: {
        type: ControlType.EventHandler,
        title: "On Click",
    },
})
