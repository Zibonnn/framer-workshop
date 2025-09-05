import React, { useState, useCallback, startTransition } from "react"
import { addPropertyControls, ControlType } from "framer"
import { type CSSProperties } from "react"

interface ButtonProps {
    text: string
    variant: "primary" | "secondary" | "outline" | "ghost" | "danger"
    size: "small" | "medium" | "large"
    disabled: boolean
    loading: boolean
    fullWidth: boolean
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
    borderRadius: number
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
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
        borderRadius = 8,
        paddingTop = 12,
        paddingRight = 24,
        paddingBottom = 12,
        paddingLeft = 24,
        font,
        onClick,
    } = props

    const [isHovered, setIsHovered] = useState(false)

    const handleClick = useCallback(() => {
        if (!disabled && !loading && onClick) {
            startTransition(() => onClick())
        }
    }, [disabled, loading, onClick])

    const handleMouseEnter = useCallback(() => {
        startTransition(() => setIsHovered(true))
    }, [])

    const handleMouseLeave = useCallback(() => {
        startTransition(() => setIsHovered(false))
    }, [])

    const getSizeStyles = () => {
        switch (size) {
            case "small":
                return {
                    paddingTop: paddingTop * 0.75,
                    paddingRight: paddingRight * 0.75,
                    paddingBottom: paddingBottom * 0.75,
                    paddingLeft: paddingLeft * 0.75,
                    fontSize: font?.fontSize || "12px",
                }
            case "large":
                return {
                    paddingTop: paddingTop * 1.25,
                    paddingRight: paddingRight * 1.25,
                    paddingBottom: paddingBottom * 1.25,
                    paddingLeft: paddingLeft * 1.25,
                    fontSize: font?.fontSize || "16px",
                }
            default:
                return {
                    paddingTop,
                    paddingRight,
                    paddingBottom,
                    paddingLeft,
                    fontSize: font?.fontSize || "14px",
                }
        }
    }

    const getVariantStyles = () => {
        const baseStyles = {
            backgroundColor: disabled ? "#CCCCCC" : backgroundColor,
            color: disabled ? "#666666" : textColor,
            border: `1px solid ${disabled ? "#CCCCCC" : borderColor}`,
        }

        if (isHovered && !disabled) {
            return {
                ...baseStyles,
                backgroundColor: hoverBackgroundColor,
                color: hoverTextColor,
                border: `1px solid ${hoverBorderColor}`,
            }
        }

        return baseStyles
    }

    const sizeStyles = getSizeStyles()
    const variantStyles = getVariantStyles()

    const buttonStyles: CSSProperties = {
        ...sizeStyles,
        ...variantStyles,
        borderRadius: `${borderRadius}px`,
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        outline: "none",
        ...font,
        fontWeight: font?.fontWeight || "500",
        letterSpacing: font?.letterSpacing || "0",
        lineHeight: font?.lineHeight || "1.2em",
    }

    const renderIcon = () => {
        if (!showIcon || !icon) return null

        const iconStyle: CSSProperties = {
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            color: disabled ? "#666666" : iconColor,
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
                    borderTop: `2px solid ${disabled ? "#666666" : textColor}`,
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
                disabled={disabled || loading}
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
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Button",
    },
    variant: {
        type: ControlType.Enum,
        title: "Variant",
        options: ["primary", "secondary", "outline", "ghost", "danger"],
        optionTitles: ["Primary", "Secondary", "Outline", "Ghost", "Danger"],
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
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#000000",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#FFFFFF",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "#000000",
    },
    hoverBackgroundColor: {
        type: ControlType.Color,
        title: "Hover Background",
        defaultValue: "#333333",
    },
    hoverTextColor: {
        type: ControlType.Color,
        title: "Hover Text",
        defaultValue: "#FFFFFF",
    },
    hoverBorderColor: {
        type: ControlType.Color,
        title: "Hover Border",
        defaultValue: "#333333",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 8,
        min: 0,
        max: 20,
        step: 1,
        unit: "px",
    },
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 12,
        min: 4,
        max: 32,
        step: 1,
        unit: "px",
    },
    paddingRight: {
        type: ControlType.Number,
        title: "Padding Right",
        defaultValue: 24,
        min: 8,
        max: 48,
        step: 1,
        unit: "px",
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 12,
        min: 4,
        max: 32,
        step: 1,
        unit: "px",
    },
    paddingLeft: {
        type: ControlType.Number,
        title: "Padding Left",
        defaultValue: 24,
        min: 8,
        max: 48,
        step: 1,
        unit: "px",
    },
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
})
