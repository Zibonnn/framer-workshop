import React, { useState, useCallback, startTransition } from "react"
import { addPropertyControls, ControlType } from "framer"
import { type CSSProperties } from "react"

interface CardProps {
    title: string
    subtitle: string
    content: string
    showTitle: boolean
    showSubtitle: boolean
    showContent: boolean
    showImage: boolean
    image: any
    imageHeight: number
    imagePosition: "top" | "bottom" | "left" | "right"
    showActions: boolean
    primaryActionText: string
    secondaryActionText: string
    showPrimaryAction: boolean
    showSecondaryAction: boolean
    backgroundColor: string
    borderColor: string
    borderRadius: number
    padding: number
    shadow: boolean
    shadowColor: string
    shadowBlur: number
    shadowOffsetX: number
    shadowOffsetY: number
    hoverEffect: boolean
    hoverScale: number
    hoverShadowBlur: number
    titleFont: any
    subtitleFont: any
    contentFont: any
    style?: CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function Card(props: CardProps) {
    const {
        title = "Card Title",
        subtitle = "Card Subtitle",
        content = "This is a card component with customizable content and styling options.",
        showTitle = true,
        showSubtitle = true,
        showContent = true,
        showImage = false,
        image,
        imageHeight = 200,
        imagePosition = "top",
        showActions = true,
        primaryActionText = "Primary",
        secondaryActionText = "Secondary",
        showPrimaryAction = true,
        showSecondaryAction = true,
        backgroundColor = "#FFFFFF",
        borderColor = "#EEEEEE",
        borderRadius = 12,
        padding = 24,
        shadow = true,
        shadowColor = "rgba(0, 0, 0, 0.1)",
        shadowBlur = 8,
        shadowOffsetX = 0,
        shadowOffsetY = 4,
        hoverEffect = true,
        hoverScale = 1.02,
        hoverShadowBlur = 16,
        titleFont,
        subtitleFont,
        contentFont,
    } = props

    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = useCallback(() => {
        if (hoverEffect) {
            startTransition(() => setIsHovered(true))
        }
    }, [hoverEffect])

    const handleMouseLeave = useCallback(() => {
        if (hoverEffect) {
            startTransition(() => setIsHovered(false))
        }
    }, [hoverEffect])

    const getImageStyles = (): CSSProperties => {
        const baseStyles: CSSProperties = {
            width: "100%",
            height: `${imageHeight}px`,
            objectFit: "cover",
            borderRadius: imagePosition === "top" ? `${borderRadius}px ${borderRadius}px 0 0` : 
                        imagePosition === "bottom" ? `0 0 ${borderRadius}px ${borderRadius}px` : 
                        `${borderRadius}px 0 0 ${borderRadius}px`,
        }

        if (imagePosition === "left" || imagePosition === "right") {
            return {
                ...baseStyles,
                width: "40%",
                height: "100%",
                borderRadius: imagePosition === "left" ? 
                    `${borderRadius}px 0 0 ${borderRadius}px` : 
                    `0 ${borderRadius}px ${borderRadius}px 0`,
            }
        }

        return baseStyles
    }

    const getCardLayout = () => {
        if (imagePosition === "left" || imagePosition === "right") {
            return {
                display: "flex",
                flexDirection: imagePosition === "left" ? "row" : "row-reverse",
                alignItems: "stretch",
            }
        }
        return {
            display: "flex",
            flexDirection: "column",
        }
    }

    const getContentStyles = (): CSSProperties => {
        const baseStyles: CSSProperties = {
            padding: `${padding}px`,
            flex: 1,
        }

        if (imagePosition === "left" || imagePosition === "right") {
            return {
                ...baseStyles,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }
        }

        return baseStyles
    }

    const cardStyles: CSSProperties = {
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
        transition: hoverEffect ? "all 0.3s ease" : "none",
        transform: isHovered && hoverEffect ? `scale(${hoverScale})` : "scale(1)",
        boxShadow: shadow ? 
            `0 ${shadowOffsetY}px ${isHovered && hoverEffect ? hoverShadowBlur : shadowBlur}px ${shadowOffsetX}px ${shadowColor}` : 
            "none",
        ...getCardLayout(),
        ...props.style,
    }

    const renderImage = () => {
        if (!showImage || !image) return null

        return (
            <div style={getImageStyles()}>
                {image}
            </div>
        )
    }

    const renderActions = () => {
        if (!showActions) return null

        return (
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "16px",
                    justifyContent: "flex-end",
                }}
            >
                {showSecondaryAction && (
                    <button
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "transparent",
                            border: `1px solid ${borderColor}`,
                            borderRadius: "6px",
                            color: "#666666",
                            cursor: "pointer",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#F5F5F5"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent"
                        }}
                    >
                        {secondaryActionText}
                    </button>
                )}
                {showPrimaryAction && (
                    <button
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#000000",
                            border: "1px solid #000000",
                            borderRadius: "6px",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            fontSize: "14px",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#333333"
                            e.currentTarget.style.borderColor = "#333333"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#000000"
                            e.currentTarget.style.borderColor = "#000000"
                        }}
                    >
                        {primaryActionText}
                    </button>
                )}
            </div>
        )
    }

    return (
        <div
            style={cardStyles}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showImage && imagePosition === "top" && renderImage()}
            
            <div style={getContentStyles()}>
                {showTitle && (
                    <h3
                        style={{
                            margin: "0 0 8px 0",
                            color: "#000000",
                            ...titleFont,
                            fontSize: titleFont?.fontSize || "18px",
                            fontWeight: titleFont?.fontWeight || "600",
                            lineHeight: titleFont?.lineHeight || "1.3em",
                        }}
                    >
                        {title}
                    </h3>
                )}
                
                {showSubtitle && (
                    <p
                        style={{
                            margin: "0 0 12px 0",
                            color: "#666666",
                            ...subtitleFont,
                            fontSize: subtitleFont?.fontSize || "14px",
                            fontWeight: subtitleFont?.fontWeight || "400",
                            lineHeight: subtitleFont?.lineHeight || "1.4em",
                        }}
                    >
                        {subtitle}
                    </p>
                )}
                
                {showContent && (
                    <p
                        style={{
                            margin: "0 0 16px 0",
                            color: "#333333",
                            ...contentFont,
                            fontSize: contentFont?.fontSize || "14px",
                            fontWeight: contentFont?.fontWeight || "400",
                            lineHeight: contentFont?.lineHeight || "1.5em",
                        }}
                    >
                        {content}
                    </p>
                )}
                
                {renderActions()}
            </div>
            
            {showImage && imagePosition === "bottom" && renderImage()}
        </div>
    )
}

addPropertyControls(Card, {
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "Card Title",
    },
    subtitle: {
        type: ControlType.String,
        title: "Subtitle",
        defaultValue: "Card Subtitle",
    },
    content: {
        type: ControlType.String,
        title: "Content",
        defaultValue: "This is a card component with customizable content and styling options.",
    },
    showTitle: {
        type: ControlType.Boolean,
        title: "Show Title",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    showSubtitle: {
        type: ControlType.Boolean,
        title: "Show Subtitle",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    showContent: {
        type: ControlType.Boolean,
        title: "Show Content",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    showImage: {
        type: ControlType.Boolean,
        title: "Show Image",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    image: {
        type: ControlType.ComponentInstance,
        title: "Image",
        hidden: ({ showImage }) => !showImage,
    },
    imageHeight: {
        type: ControlType.Number,
        title: "Image Height",
        defaultValue: 200,
        min: 100,
        max: 400,
        step: 10,
        unit: "px",
        hidden: ({ showImage }) => !showImage,
    },
    imagePosition: {
        type: ControlType.Enum,
        title: "Image Position",
        options: ["top", "bottom", "left", "right"],
        optionTitles: ["Top", "Bottom", "Left", "Right"],
        defaultValue: "top",
        hidden: ({ showImage }) => !showImage,
    },
    showActions: {
        type: ControlType.Boolean,
        title: "Show Actions",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    primaryActionText: {
        type: ControlType.String,
        title: "Primary Action",
        defaultValue: "Primary",
        hidden: ({ showActions, showPrimaryAction }) => !showActions || !showPrimaryAction,
    },
    secondaryActionText: {
        type: ControlType.String,
        title: "Secondary Action",
        defaultValue: "Secondary",
        hidden: ({ showActions, showSecondaryAction }) => !showActions || !showSecondaryAction,
    },
    showPrimaryAction: {
        type: ControlType.Boolean,
        title: "Show Primary Action",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ showActions }) => !showActions,
    },
    showSecondaryAction: {
        type: ControlType.Boolean,
        title: "Show Secondary Action",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ showActions }) => !showActions,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#FFFFFF",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "#EEEEEE",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 12,
        min: 0,
        max: 30,
        step: 1,
        unit: "px",
    },
    padding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: 24,
        min: 8,
        max: 48,
        step: 2,
        unit: "px",
    },
    shadow: {
        type: ControlType.Boolean,
        title: "Shadow",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    shadowColor: {
        type: ControlType.Color,
        title: "Shadow Color",
        defaultValue: "rgba(0, 0, 0, 0.1)",
        hidden: ({ shadow }) => !shadow,
    },
    shadowBlur: {
        type: ControlType.Number,
        title: "Shadow Blur",
        defaultValue: 8,
        min: 0,
        max: 30,
        step: 1,
        unit: "px",
        hidden: ({ shadow }) => !shadow,
    },
    shadowOffsetX: {
        type: ControlType.Number,
        title: "Shadow X",
        defaultValue: 0,
        min: -10,
        max: 10,
        step: 1,
        unit: "px",
        hidden: ({ shadow }) => !shadow,
    },
    shadowOffsetY: {
        type: ControlType.Number,
        title: "Shadow Y",
        defaultValue: 4,
        min: 0,
        max: 20,
        step: 1,
        unit: "px",
        hidden: ({ shadow }) => !shadow,
    },
    hoverEffect: {
        type: ControlType.Boolean,
        title: "Hover Effect",
        defaultValue: true,
        enabledTitle: "Enable",
        disabledTitle: "Disable",
    },
    hoverScale: {
        type: ControlType.Number,
        title: "Hover Scale",
        defaultValue: 1.02,
        min: 1,
        max: 1.1,
        step: 0.01,
        hidden: ({ hoverEffect }) => !hoverEffect,
    },
    hoverShadowBlur: {
        type: ControlType.Number,
        title: "Hover Shadow Blur",
        defaultValue: 16,
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
        hidden: ({ hoverEffect }) => !hoverEffect,
    },
    titleFont: {
        type: ControlType.Font,
        title: "Title Font",
        defaultValue: {
            fontSize: "18px",
            variant: "SemiBold",
            letterSpacing: "-0.01em",
            lineHeight: "1.3em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
        hidden: ({ showTitle }) => !showTitle,
    },
    subtitleFont: {
        type: ControlType.Font,
        title: "Subtitle Font",
        defaultValue: {
            fontSize: "14px",
            variant: "Regular",
            letterSpacing: "0",
            lineHeight: "1.4em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
        hidden: ({ showSubtitle }) => !showSubtitle,
    },
    contentFont: {
        type: ControlType.Font,
        title: "Content Font",
        defaultValue: {
            fontSize: "14px",
            variant: "Regular",
            letterSpacing: "0",
            lineHeight: "1.5em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
        hidden: ({ showContent }) => !showContent,
    },
})
