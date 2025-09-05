// Form component with style customization and multiple input types including chip suggestions
import {
    useState,
    useCallback,
    startTransition,
    type CSSProperties,
} from "react"
import { addPropertyControls, ControlType } from "framer"

interface FormBuilderProps {
    fieldType: "text" | "textarea" | "dropdown" | "radio" | "chips"
    label: string
    showLabel: boolean
    placeholder: string
    placeholderColor: string
    required: boolean
    dropdownOptions: { label: string; value: string }[]
    radioOptions: { label: string; value: string }[]
    chipSuggestions: string[]
    backgroundColor: string
    borderColor: string
    focusColor: string
    textColor: string
    labelColor: string
    borderRadius: number
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
    labelFont: any
    inputFont: any
    showChips: boolean
    chipBackgroundColor: string
    chipTextColor: string
    chipSelectedBackgroundColor: string
    chipSelectedTextColor: string
    chipBorderColor: string
    chipBorderRadius: number
    chipPadding: number
    chipGap: number
    chipFont: any
    showChipBeforeIcon: boolean
    chipBeforeIcon: any
    chipBeforeIconColor: string
    showChipAfterIcon: boolean
    chipAfterIcon: any
    chipAfterIconColor: string
    chipIconSize: number
    showClearButton: boolean
    clearButtonColor: string
    showBeforeIcon: boolean
    beforeIcon: any
    beforeIconColor: string
    showAfterIcon: boolean
    afterIcon: any
    afterIconColor: string
    iconSize: number
    showButton: boolean
    buttonText: string
    buttonEnabledBackground: string
    buttonEnabledText: string
    buttonDisabledBackground: string
    buttonDisabledText: string
    buttonBorderRadius: number
    buttonPadding: number
    buttonFont: any
    style?: CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function FormBuilder(props: FormBuilderProps) {
    const {
        fieldType = "text",
        label = "Field Label",
        showLabel = true,
        placeholder = "Enter text...",
        placeholderColor = "#999999",
        required = false,
        dropdownOptions = [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
        ],
        radioOptions = [
            { label: "Choice A", value: "a" },
            { label: "Choice B", value: "b" },
            { label: "Choice C", value: "c" },
        ],
        chipSuggestions = [
            "Suggestion 1",
            "Suggestion 2",
            "Suggestion 3",
            "Suggestion 4",
        ],
        backgroundColor = "#FFFFFF",
        borderColor = "#EEEEEE",
        focusColor = "#000000",
        textColor = "#000000",
        labelColor = "#000000",
        borderRadius = 8,
        paddingTop = 12,
        paddingRight = 12,
        paddingBottom = 12,
        paddingLeft = 12,
        labelFont,
        inputFont,
        showChips = true,
        chipBackgroundColor = "#F5F5F5",
        chipTextColor = "#000000",
        chipSelectedBackgroundColor = "#000000",
        chipSelectedTextColor = "#FFFFFF",
        chipBorderColor = "#EEEEEE",
        chipBorderRadius = 16,
        chipPadding = 8,
        chipGap = 6,
        chipFont,
        showChipBeforeIcon = false,
        chipBeforeIcon,
        chipBeforeIconColor = "#000000",
        showChipAfterIcon = false,
        chipAfterIcon,
        chipAfterIconColor = "#000000",
        chipIconSize = 12,
        showClearButton = true,
        clearButtonColor = "#CCCCCC",
        showBeforeIcon = false,
        beforeIcon,
        beforeIconColor = "#000000",
        showAfterIcon = false,
        afterIcon,
        afterIconColor = "#000000",
        iconSize = 16,
        showButton = false,
        buttonText = "Submit",
        buttonEnabledBackground = "#000000",
        buttonEnabledText = "#FFFFFF",
        buttonDisabledBackground = "#CCCCCC",
        buttonDisabledText = "#666666",
        buttonBorderRadius = 8,
        buttonPadding = 12,
        buttonFont,
    } = props

    const [value, setValue] = useState("")
    const [selectedChips, setSelectedChips] = useState<string[]>([])
    const [isFocused, setIsFocused] = useState(false)

    const handleInputChange = useCallback((newValue: string) => {
        startTransition(() => setValue(newValue))
    }, [])

    const handleChipClick = useCallback(
        (chip: string) => {
            if (fieldType === "chips") {
                startTransition(() => {
                    setSelectedChips((prev) =>
                        prev.includes(chip)
                            ? prev.filter((c) => c !== chip)
                            : [...prev, chip]
                    )
                })
            } else {
                // For text and textarea fields, accumulate chips with comma separation
                startTransition(() => {
                    if (value.trim() === "") {
                        setValue(chip)
                    } else {
                        setValue((prev) => prev + ", " + chip)
                    }
                })
            }
        },
        [fieldType, value]
    )

    const handleFocus = useCallback(() => {
        startTransition(() => setIsFocused(true))
    }, [])

    const handleBlur = useCallback(() => {
        startTransition(() => setIsFocused(false))
    }, [])

    const handleClear = useCallback(() => {
        startTransition(() => setValue(""))
    }, [])

    const handleButtonClick = useCallback(() => {
        // Button click handler - can be customized
        console.log("Form submitted with value:", value)
    }, [value])

    const getInputPadding = () => {
        let leftPadding = paddingLeft
        let rightPadding = paddingRight

        if (showBeforeIcon && beforeIcon) {
            leftPadding = paddingLeft + iconSize + 8
        }

        if (showAfterIcon && afterIcon) {
            rightPadding = paddingRight + iconSize + 8
        }

        if (
            showClearButton &&
            value &&
            (fieldType === "text" || fieldType === "textarea")
        ) {
            rightPadding = Math.max(rightPadding, paddingRight + 32)
        }

        return { leftPadding, rightPadding }
    }

    const { leftPadding, rightPadding } = getInputPadding()

    const inputStyles: CSSProperties = {
        width: "100%",
        paddingLeft: `${leftPadding}px`,
        paddingRight: `${rightPadding}px`,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        backgroundColor,
        border: `1px solid ${isFocused ? focusColor : borderColor}`,
        borderRadius: `${borderRadius}px`,
        color: textColor,
        outline: "none",
        transition: "border-color 0.2s ease",
        ...inputFont,
        fontSize: inputFont?.fontSize || "14px",
    }

    const placeholderStyles: CSSProperties = {
        color: placeholderColor,
    }

    const renderIcon = (
        icon: any,
        color: string,
        position: "before" | "after"
    ) => {
        if (!icon) return null

        const iconStyle: CSSProperties = {
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [position === "before" ? "left" : "right"]:
                position === "before"
                    ? `${paddingLeft}px`
                    : `${paddingRight}px`,
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            color: color,
            pointerEvents: "none",
            zIndex: 1,
        }

        return <div style={iconStyle}>{icon}</div>
    }

    const renderChipIcon = (
        icon: any,
        color: string,
        position: "before" | "after"
    ) => {
        if (!icon) return null

        return (
            <div
                style={{
                    width: `${chipIconSize}px`,
                    height: `${chipIconSize}px`,
                    color: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </div>
        )
    }

    // Check if form has content for button state
    const hasContent = value.trim().length > 0 || selectedChips.length > 0
    const isButtonDisabled = !hasContent

    const renderInput = () => {
        switch (fieldType) {
            case "textarea":
                return (
                    <div style={{ position: "relative" }}>
                        {showBeforeIcon &&
                            beforeIcon &&
                            renderIcon(beforeIcon, beforeIconColor, "before")}
                        {showAfterIcon &&
                            afterIcon &&
                            renderIcon(afterIcon, afterIconColor, "after")}
                        <textarea
                            value={value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={placeholder}
                            required={required}
                            className="form-builder-textarea"
                            style={{
                                ...inputStyles,
                                minHeight: "80px",
                                resize: "vertical",
                                fontFamily: "inherit",
                            }}
                        />
                        {showClearButton && value && (
                            <button
                                type="button"
                                onClick={handleClear}
                                style={{
                                    position: "absolute",
                                    right:
                                        showAfterIcon && afterIcon
                                            ? `${paddingRight + iconSize + 8}px`
                                            : "8px",
                                    top: "8px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: clearButtonColor,
                                    fontSize: "16px",
                                    width: "24px",
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    transition: "background-color 0.2s ease",
                                    zIndex: 2,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#F0F0F0"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent"
                                }}
                                aria-label="Clear input"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )

            case "dropdown":
                return (
                    <div style={{ position: "relative" }}>
                        {showBeforeIcon &&
                            beforeIcon &&
                            renderIcon(beforeIcon, beforeIconColor, "before")}
                        {showAfterIcon &&
                            afterIcon &&
                            renderIcon(afterIcon, afterIconColor, "after")}
                        <select
                            value={value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required={required}
                            style={{
                                ...inputStyles,
                                cursor: "pointer",
                                appearance: "none",
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(textColor)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition:
                                    showAfterIcon && afterIcon
                                        ? `right ${paddingRight + iconSize + 16}px center`
                                        : "right 12px center",
                                backgroundSize: "16px",
                            }}
                        >
                            <option value="">{placeholder}</option>
                            {dropdownOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )

            case "radio":
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        {radioOptions.map((option, index) => (
                            <label
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    cursor: "pointer",
                                    ...inputFont,
                                    fontSize: inputFont?.fontSize || "14px",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="radio-group"
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={(e) =>
                                        handleInputChange(e.target.value)
                                    }
                                    style={{
                                        accentColor: focusColor,
                                        width: "16px",
                                        height: "16px",
                                    }}
                                />
                                <span style={{ color: textColor }}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )

            case "chips":
                return (
                    <div
                        style={{
                            ...inputStyles,
                            minHeight: "fit-content",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                            alignItems: "center",
                            position: "relative",
                        }}
                        onClick={handleFocus}
                        onBlur={handleBlur}
                        tabIndex={0}
                    >
                        {showBeforeIcon && beforeIcon && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: `${paddingLeft}px`,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: `${iconSize}px`,
                                    height: `${iconSize}px`,
                                    color: beforeIconColor,
                                    pointerEvents: "none",
                                    zIndex: 1,
                                }}
                            >
                                {beforeIcon}
                            </div>
                        )}
                        {showAfterIcon && afterIcon && (
                            <div
                                style={{
                                    position: "absolute",
                                    right: `${paddingRight}px`,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: `${iconSize}px`,
                                    height: `${iconSize}px`,
                                    color: afterIconColor,
                                    pointerEvents: "none",
                                    zIndex: 1,
                                }}
                            >
                                {afterIcon}
                            </div>
                        )}
                        {selectedChips.map((chip, index) => (
                            <span
                                key={index}
                                style={{
                                    backgroundColor:
                                        chipSelectedBackgroundColor,
                                    color: chipSelectedTextColor,
                                    border: `1px solid ${chipBorderColor}`,
                                    padding: `${chipPadding}px ${chipPadding * 1.5}px`,
                                    borderRadius: `${chipBorderRadius}px`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    cursor: "pointer",
                                    ...chipFont,
                                    fontSize: chipFont?.fontSize || "12px",
                                }}
                                onClick={() => handleChipClick(chip)}
                            >
                                {showChipBeforeIcon &&
                                    chipBeforeIcon &&
                                    renderChipIcon(
                                        chipBeforeIcon,
                                        chipSelectedTextColor,
                                        "before"
                                    )}
                                {chip}
                                {showChipAfterIcon &&
                                    chipAfterIcon &&
                                    renderChipIcon(
                                        chipAfterIcon,
                                        chipSelectedTextColor,
                                        "after"
                                    )}
                                <span style={{ fontSize: "10px" }}>×</span>
                            </span>
                        ))}
                        {selectedChips.length === 0 && (
                            <span
                                style={{
                                    color: placeholderColor,
                                    fontSize: inputFont?.fontSize || "14px",
                                    marginLeft:
                                        showBeforeIcon && beforeIcon
                                            ? `${iconSize + 8}px`
                                            : "0px",
                                }}
                            >
                                {placeholder}
                            </span>
                        )}
                    </div>
                )

            default:
                return (
                    <div style={{ position: "relative" }}>
                        {showBeforeIcon &&
                            beforeIcon &&
                            renderIcon(beforeIcon, beforeIconColor, "before")}
                        {showAfterIcon &&
                            afterIcon &&
                            renderIcon(afterIcon, afterIconColor, "after")}
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder={placeholder}
                            required={required}
                            className="form-builder-input"
                            style={inputStyles}
                        />
                        {showClearButton && value && (
                            <button
                                type="button"
                                onClick={handleClear}
                                style={{
                                    position: "absolute",
                                    right:
                                        showAfterIcon && afterIcon
                                            ? `${paddingRight + iconSize + 8}px`
                                            : "8px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: clearButtonColor,
                                    fontSize: "16px",
                                    width: "24px",
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    transition: "background-color 0.2s ease",
                                    zIndex: 2,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "#F0F0F0"
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent"
                                }}
                                aria-label="Clear input"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )
        }
    }

    return (
        <>
            <style>
                {`
                    .form-builder-input::placeholder {
                        color: ${placeholderColor} !important;
                    }
                    .form-builder-textarea::placeholder {
                        color: ${placeholderColor} !important;
                    }
                `}
            </style>
            <div
                style={{
                    ...props.style,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: "100%",
                }}
            >
                {showLabel && (
                    <label
                        style={{
                            color: labelColor,
                            ...labelFont,
                            fontSize: labelFont?.fontSize || "14px",
                            fontWeight: labelFont?.fontWeight || "500",
                        }}
                    >
                        {label}
                        {required && (
                            <span
                                style={{ color: "#FF5588", marginLeft: "2px" }}
                            >
                                *
                            </span>
                        )}
                    </label>
                )}

                {renderInput()}

                {showChips &&
                    (fieldType === "text" ||
                        fieldType === "textarea" ||
                        fieldType === "chips") && (
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: `${chipGap}px`,
                                marginTop: "4px",
                            }}
                        >
                            {chipSuggestions.map((chip, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleChipClick(chip)}
                                    style={{
                                        backgroundColor: selectedChips.includes(
                                            chip
                                        )
                                            ? chipSelectedBackgroundColor
                                            : chipBackgroundColor,
                                        color: selectedChips.includes(chip)
                                            ? chipSelectedTextColor
                                            : chipTextColor,
                                        border: `1px solid ${chipBorderColor}`,
                                        borderRadius: `${chipBorderRadius}px`,
                                        padding: `${chipPadding}px ${chipPadding * 1.5}px`,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        outline: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        ...chipFont,
                                        fontSize: chipFont?.fontSize || "12px",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!selectedChips.includes(chip)) {
                                            e.currentTarget.style.backgroundColor =
                                                "#F0F0F0"
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!selectedChips.includes(chip)) {
                                            e.currentTarget.style.backgroundColor =
                                                chipBackgroundColor
                                        }
                                    }}
                                >
                                    {showChipBeforeIcon &&
                                        chipBeforeIcon &&
                                        renderChipIcon(
                                            chipBeforeIcon,
                                            selectedChips.includes(chip)
                                                ? chipSelectedTextColor
                                                : chipBeforeIconColor,
                                            "before"
                                        )}
                                    {chip}
                                    {showChipAfterIcon &&
                                        chipAfterIcon &&
                                        renderChipIcon(
                                            chipAfterIcon,
                                            selectedChips.includes(chip)
                                                ? chipSelectedTextColor
                                                : chipAfterIconColor,
                                            "after"
                                        )}
                                </button>
                            ))}
                        </div>
                    )}

                {showButton && (
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        disabled={isButtonDisabled}
                        style={{
                            backgroundColor: isButtonDisabled
                                ? buttonDisabledBackground
                                : buttonEnabledBackground,
                            color: isButtonDisabled
                                ? buttonDisabledText
                                : buttonEnabledText,
                            border: "none",
                            borderRadius: `${buttonBorderRadius}px`,
                            padding: `${buttonPadding}px ${buttonPadding * 2}px`,
                            cursor: isButtonDisabled
                                ? "not-allowed"
                                : "pointer",
                            transition: "all 0.2s ease",
                            outline: "none",
                            marginTop: "8px",
                            ...buttonFont,
                            fontSize: buttonFont?.fontSize || "14px",
                            opacity: isButtonDisabled ? 0.6 : 1,
                        }}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </>
    )
}

addPropertyControls(FormBuilder, {
    fieldType: {
        type: ControlType.Enum,
        title: "Field Type",
        options: ["text", "textarea", "dropdown", "radio", "chips"],
        optionTitles: ["Text", "Text Area", "Dropdown", "Radio", "Chips"],
        defaultValue: "text",
    },
    showLabel: {
        type: ControlType.Boolean,
        title: "Show Label",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Field Label",
        hidden: ({ showLabel }) => !showLabel,
    },
    placeholder: {
        type: ControlType.String,
        title: "Placeholder",
        defaultValue: "Enter text...",
    },
    placeholderColor: {
        type: ControlType.Color,
        title: "Placeholder Color",
        defaultValue: "#999999",
    },
    required: {
        type: ControlType.Boolean,
        title: "Required",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },

    // Field-specific options
    dropdownOptions: {
        type: ControlType.Array,
        title: "Options",
        control: {
            type: ControlType.Object,
            controls: {
                label: {
                    type: ControlType.String,
                    defaultValue: "Option",
                },
                value: {
                    type: ControlType.String,
                    defaultValue: "option",
                },
            },
        },
        defaultValue: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
        ],
        hidden: ({ fieldType }) => fieldType !== "dropdown",
    },
    radioOptions: {
        type: ControlType.Array,
        title: "Options",
        control: {
            type: ControlType.Object,
            controls: {
                label: {
                    type: ControlType.String,
                    defaultValue: "Choice",
                },
                value: {
                    type: ControlType.String,
                    defaultValue: "choice",
                },
            },
        },
        defaultValue: [
            { label: "Choice A", value: "a" },
            { label: "Choice B", value: "b" },
            { label: "Choice C", value: "c" },
        ],
        hidden: ({ fieldType }) => fieldType !== "radio",
    },

    // Chip settings
    showChips: {
        type: ControlType.Boolean,
        title: "Show Chips",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ fieldType }) =>
            fieldType !== "text" &&
            fieldType !== "textarea" &&
            fieldType !== "chips",
    },
    chipSuggestions: {
        type: ControlType.Array,
        title: "Chip Suggestions",
        control: {
            type: ControlType.String,
        },
        defaultValue: [
            "Suggestion 1",
            "Suggestion 2",
            "Suggestion 3",
            "Suggestion 4",
        ],
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },

    // Chip styling
    chipBackgroundColor: {
        type: ControlType.Color,
        title: "Chip Background",
        defaultValue: "#F5F5F5",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipTextColor: {
        type: ControlType.Color,
        title: "Chip Text",
        defaultValue: "#000000",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipSelectedBackgroundColor: {
        type: ControlType.Color,
        title: "Selected Background",
        defaultValue: "#000000",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipSelectedTextColor: {
        type: ControlType.Color,
        title: "Selected Text",
        defaultValue: "#FFFFFF",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipBorderColor: {
        type: ControlType.Color,
        title: "Chip Border",
        defaultValue: "#EEEEEE",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipBorderRadius: {
        type: ControlType.Number,
        title: "Chip Radius",
        defaultValue: 16,
        min: 0,
        max: 30,
        step: 1,
        unit: "px",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipPadding: {
        type: ControlType.Number,
        title: "Chip Padding",
        defaultValue: 8,
        min: 2,
        max: 16,
        step: 1,
        unit: "px",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipGap: {
        type: ControlType.Number,
        title: "Chip Gap",
        defaultValue: 6,
        min: 0,
        max: 20,
        step: 1,
        unit: "px",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipFont: {
        type: ControlType.Font,
        title: "Chip Font",
        defaultValue: {
            fontSize: "12px",
            variant: "Medium",
            letterSpacing: "-0.01em",
            lineHeight: "1.2em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },

    // Chip icons
    showChipBeforeIcon: {
        type: ControlType.Boolean,
        title: "Chip Before Icon",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipBeforeIcon: {
        type: ControlType.ComponentInstance,
        title: "Before Icon",
        hidden: ({ fieldType, showChips, showChipBeforeIcon }) =>
            !showChips ||
            !showChipBeforeIcon ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipBeforeIconColor: {
        type: ControlType.Color,
        title: "Before Icon Color",
        defaultValue: "#000000",
        hidden: ({ fieldType, showChips, showChipBeforeIcon }) =>
            !showChips ||
            !showChipBeforeIcon ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    showChipAfterIcon: {
        type: ControlType.Boolean,
        title: "Chip After Icon",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ fieldType, showChips }) =>
            !showChips ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipAfterIcon: {
        type: ControlType.ComponentInstance,
        title: "After Icon",
        hidden: ({ fieldType, showChips, showChipAfterIcon }) =>
            !showChips ||
            !showChipAfterIcon ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipAfterIconColor: {
        type: ControlType.Color,
        title: "After Icon Color",
        defaultValue: "#000000",
        hidden: ({ fieldType, showChips, showChipAfterIcon }) =>
            !showChips ||
            !showChipAfterIcon ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },
    chipIconSize: {
        type: ControlType.Number,
        title: "Chip Icon Size",
        defaultValue: 12,
        min: 8,
        max: 20,
        step: 1,
        unit: "px",
        hidden: ({
            fieldType,
            showChips,
            showChipBeforeIcon,
            showChipAfterIcon,
        }) =>
            !showChips ||
            (!showChipBeforeIcon && !showChipAfterIcon) ||
            (fieldType !== "text" &&
                fieldType !== "textarea" &&
                fieldType !== "chips"),
    },

    // Clear button
    showClearButton: {
        type: ControlType.Boolean,
        title: "Clear Button",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ fieldType }) =>
            fieldType !== "text" && fieldType !== "textarea",
    },
    clearButtonColor: {
        type: ControlType.Color,
        title: "Clear Button Color",
        defaultValue: "#CCCCCC",
        hidden: ({ fieldType, showClearButton }) =>
            !showClearButton ||
            (fieldType !== "text" && fieldType !== "textarea"),
    },

    // Field icons
    showBeforeIcon: {
        type: ControlType.Boolean,
        title: "Before Icon",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    beforeIcon: {
        type: ControlType.ComponentInstance,
        title: "Before Icon",
        hidden: ({ showBeforeIcon, fieldType }) =>
            !showBeforeIcon || fieldType === "radio",
    },
    beforeIconColor: {
        type: ControlType.Color,
        title: "Before Icon Color",
        defaultValue: "#000000",
        hidden: ({ showBeforeIcon, fieldType }) =>
            !showBeforeIcon || fieldType === "radio",
    },
    showAfterIcon: {
        type: ControlType.Boolean,
        title: "After Icon",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    afterIcon: {
        type: ControlType.ComponentInstance,
        title: "After Icon",
        hidden: ({ showAfterIcon, fieldType }) =>
            !showAfterIcon || fieldType === "radio",
    },
    afterIconColor: {
        type: ControlType.Color,
        title: "After Icon Color",
        defaultValue: "#000000",
        hidden: ({ showAfterIcon, fieldType }) =>
            !showAfterIcon || fieldType === "radio",
    },
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        defaultValue: 16,
        min: 12,
        max: 24,
        step: 1,
        unit: "px",
        hidden: ({ showBeforeIcon, showAfterIcon, fieldType }) =>
            (!showBeforeIcon && !showAfterIcon) || fieldType === "radio",
    },

    // Styling
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#FFFFFF",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border Color",
        defaultValue: "#EEEEEE",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    focusColor: {
        type: ControlType.Color,
        title: "Focus Color",
        defaultValue: "#000000",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#000000",
    },
    labelColor: {
        type: ControlType.Color,
        title: "Label Color",
        defaultValue: "#000000",
        hidden: ({ showLabel }) => !showLabel,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Border Radius",
        defaultValue: 8,
        min: 0,
        max: 20,
        step: 1,
        unit: "px",
        hidden: ({ fieldType }) => fieldType === "radio",
    },

    // Padding controls
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 12,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    paddingRight: {
        type: ControlType.Number,
        title: "Padding Right",
        defaultValue: 12,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 12,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
        hidden: ({ fieldType }) => fieldType === "radio",
    },
    paddingLeft: {
        type: ControlType.Number,
        title: "Padding Left",
        defaultValue: 12,
        min: 0,
        max: 32,
        step: 1,
        unit: "px",
        hidden: ({ fieldType }) => fieldType === "radio",
    },

    // Typography
    labelFont: {
        type: ControlType.Font,
        title: "Label Font",
        defaultValue: {
            fontSize: "14px",
            variant: "Medium",
            letterSpacing: "-0.01em",
            lineHeight: "1.2em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
        hidden: ({ showLabel }) => !showLabel,
    },
    inputFont: {
        type: ControlType.Font,
        title: "Input Font",
        defaultValue: {
            fontSize: "14px",
            variant: "Regular",
            letterSpacing: "-0.01em",
            lineHeight: "1.3em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
    },

    // Button controls
    showButton: {
        type: ControlType.Boolean,
        title: "Show Button",
        defaultValue: false,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    buttonText: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Submit",
        hidden: ({ showButton }) => !showButton,
    },
    buttonEnabledBackground: {
        type: ControlType.Color,
        title: "Button Background",
        defaultValue: "#000000",
        hidden: ({ showButton }) => !showButton,
    },
    buttonEnabledText: {
        type: ControlType.Color,
        title: "Button Text Color",
        defaultValue: "#FFFFFF",
        hidden: ({ showButton }) => !showButton,
    },
    buttonDisabledBackground: {
        type: ControlType.Color,
        title: "Disabled Background",
        defaultValue: "#CCCCCC",
        hidden: ({ showButton }) => !showButton,
    },
    buttonDisabledText: {
        type: ControlType.Color,
        title: "Disabled Text Color",
        defaultValue: "#666666",
        hidden: ({ showButton }) => !showButton,
    },
    buttonBorderRadius: {
        type: ControlType.Number,
        title: "Button Border Radius",
        defaultValue: 8,
        min: 0,
        max: 20,
        step: 1,
        unit: "px",
        hidden: ({ showButton }) => !showButton,
    },
    buttonPadding: {
        type: ControlType.Number,
        title: "Button Padding",
        defaultValue: 12,
        min: 4,
        max: 32,
        step: 1,
        unit: "px",
        hidden: ({ showButton }) => !showButton,
    },
    buttonFont: {
        type: ControlType.Font,
        title: "Button Font",
        defaultValue: {
            fontSize: "14px",
            variant: "Medium",
            letterSpacing: "0",
            lineHeight: "1.2em",
        },
        controls: "extended",
        defaultFontType: "sans-serif",
        hidden: ({ showButton }) => !showButton,
    },
})
