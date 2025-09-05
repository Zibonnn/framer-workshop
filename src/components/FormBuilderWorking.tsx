import React, {
    useState,
    useCallback,
    startTransition,
    type CSSProperties,
} from "react"
import { addPropertyControls, ControlType } from "framer"
import { useMotionValue } from "framer-motion"

interface FormBuilderWorkingProps {
    fieldType: "text" | "textarea" | "dropdown" | "radio" | "chips"
    label: string
    showLabel: boolean
    placeholder: string
    placeholderColor: string
    required: boolean
    showChips: boolean
    chipSuggestions: string[]
    backgroundColor: string
    borderColor: string
    focusColor: string
    textColor: string
    labelColor: string
    borderRadius: string
    heightMode: "fixed" | "fit"
    height: number
    padding: string
    showClearButton: boolean
    clearButtonColor: string
    showButton: boolean
    buttonText: string
    buttonState?: "enabled" | "disabled"
    componentId?: string
    style?: CSSProperties
}

// Global state for component communication
let globalState: any = {}

// Helper function to notify all buttons about form changes
const notifyButtons = (formId: string, formData: any) => {
    // Find all buttons that are linked to this form
    Object.keys(globalState).forEach(key => {
        const component = globalState[key]
        if (component.type === 'button' && component.linkedFormId === formId) {
            // Update the button's external disabled state
            if (component.updateExternalDisabled) {
                component.updateExternalDisabled(!formData.hasContent)
            }
        }
    })
}

// Helper function to set component data
const setComponentData = (id: string, type: 'form' | 'button', data: any) => {
    globalState[id] = { id, type, ...data }
    console.log(`FormBuilder: Set data for ${id}:`, data)
    
    // If this is a form, notify all linked buttons
    if (type === 'form') {
        notifyButtons(id, data)
    }
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function FormBuilderWorking(props: FormBuilderWorkingProps) {
    const {
        fieldType = "text",
        label = "Field Label",
        showLabel = true,
        placeholder = "Enter text...",
        placeholderColor = "#9CA3AF",
        required = false,
        showChips = false,
        chipSuggestions = [],
        backgroundColor = "#FFFFFF",
        borderColor = "#E5E7EB",
        focusColor = "#3B82F6",
        textColor = "#111827",
        labelColor = "#374151",
        borderRadius = "8px",
        heightMode = "fixed",
        height = 40,
        padding = "12px 16px",
        showClearButton = false,
        clearButtonColor = "#9CA3AF",
        showButton = false,
        buttonText = "Submit",
        buttonState,
        componentId = "form-" + Math.random().toString(36).substr(2, 9),
    } = props

    const [value, setValue] = useState("")
    const [selectedChips, setSelectedChips] = useState<string[]>([])
    const [isFocused, setIsFocused] = useState(false)

    // Motion values for linking with external components
    const buttonDisabledMotion = useMotionValue(false)
    const hasContentMotion = useMotionValue(false)

    const handleInputChange = useCallback((newValue: string) => {
        startTransition(() => setValue(newValue))
    }, [])

    const handleChipsChange = useCallback((newChips: string[]) => {
        startTransition(() => setSelectedChips(newChips))
    }, [])

    const handleClear = useCallback(() => {
        setValue("")
        setSelectedChips([])
    }, [])

    const handleChipClick = useCallback((chip: string) => {
        setSelectedChips(prev => {
            if (prev.includes(chip)) {
                return prev.filter(c => c !== chip)
            } else {
                return [...prev, chip]
            }
        })
    }, [])

    // Check if form has content for button state
    const hasContent = value.trim().length > 0 || selectedChips.length > 0
    const isButtonDisabled = buttonState ? buttonState === "disabled" : !hasContent

    // Update motion values when content changes
    React.useEffect(() => {
        hasContentMotion.set(hasContent)
        buttonDisabledMotion.set(isButtonDisabled)
    }, [hasContent, isButtonDisabled, hasContentMotion, buttonDisabledMotion])

    // Update component data when form state changes
    React.useEffect(() => {
        setComponentData(componentId, 'form', {
            hasContent,
            isButtonDisabled,
            value,
            selectedChips,
            fieldType,
            label
        })
    }, [hasContent, isButtonDisabled, value, selectedChips, fieldType, label, componentId])

    const renderInput = () => {
        switch (fieldType) {
            case "textarea":
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        required={required}
                        style={{
                            width: "100%",
                            minHeight: heightMode === "fit" ? "60px" : `${height}px`,
                            height: heightMode === "fixed" ? `${height}px` : "auto",
                            padding: padding,
                            border: `1px solid ${isFocused ? focusColor : borderColor}`,
                            borderRadius: borderRadius,
                            backgroundColor: backgroundColor,
                            color: textColor,
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                            resize: heightMode === "fit" ? "vertical" : "none",
                        }}
                    />
                )
            case "dropdown":
                return (
                    <select
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        required={required}
                        style={{
                            width: "100%",
                            height: `${height}px`,
                            padding: padding,
                            border: `1px solid ${isFocused ? focusColor : borderColor}`,
                            borderRadius: borderRadius,
                            backgroundColor: backgroundColor,
                            color: textColor,
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                        }}
                    >
                        <option value="">{placeholder}</option>
                        {chipSuggestions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )
            case "radio":
                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {chipSuggestions.map((option, index) => (
                            <label key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                    type="radio"
                                    name={componentId}
                                    value={option}
                                    checked={value === option}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    style={{ margin: 0 }}
                                />
                                <span style={{ color: textColor, fontSize: "14px" }}>{option}</span>
                            </label>
                        ))}
                    </div>
                )
            case "chips":
                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {chipSuggestions.map((chip, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleChipClick(chip)}
                                    style={{
                                        padding: "4px 8px",
                                        border: `1px solid ${selectedChips.includes(chip) ? focusColor : borderColor}`,
                                        borderRadius: "16px",
                                        backgroundColor: selectedChips.includes(chip) ? focusColor : backgroundColor,
                                        color: selectedChips.includes(chip) ? "#FFFFFF" : textColor,
                                        fontSize: "12px",
                                        cursor: "pointer",
                                        outline: "none",
                                    }}
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                        {showClearButton && selectedChips.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClear}
                                style={{
                                    padding: "4px 8px",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    color: clearButtonColor,
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    outline: "none",
                                }}
                            >
                                Clear selection
                            </button>
                        )}
                    </div>
                )
            default: // text
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        required={required}
                        style={{
                            width: "100%",
                            height: `${height}px`,
                            padding: padding,
                            border: `1px solid ${isFocused ? focusColor : borderColor}`,
                            borderRadius: borderRadius,
                            backgroundColor: backgroundColor,
                            color: textColor,
                            fontSize: "14px",
                            fontFamily: "inherit",
                            outline: "none",
                        }}
                    />
                )
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...props.style }}>
            {showLabel && (
                <label style={{ color: labelColor, fontSize: "14px", fontWeight: "500" }}>
                    {label}
                    {required && <span style={{ color: "#EF4444", marginLeft: "4px" }}>*</span>}
                </label>
            )}
            
            <div style={{ position: "relative" }}>
                {renderInput()}
            </div>

            {showButton && (
                <button
                    type="button"
                    disabled={isButtonDisabled}
                    style={{
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: isButtonDisabled ? "#CCCCCC" : "#3B82F6",
                        color: isButtonDisabled ? "#666666" : "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: isButtonDisabled ? "not-allowed" : "pointer",
                        outline: "none",
                        marginTop: "8px",
                    }}
                >
                    {buttonText}
                </button>
            )}
        </div>
    )
}

addPropertyControls(FormBuilderWorking, {
    fieldType: {
        type: ControlType.Enum,
        title: "Field Type",
        options: ["text", "textarea", "dropdown", "radio", "chips"],
        optionTitles: ["Text", "Text Area", "Dropdown", "Radio", "Chips"],
        defaultValue: "text",
    },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Field Label",
    },
    showLabel: {
        type: ControlType.Boolean,
        title: "Show Label",
        defaultValue: true,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    placeholder: {
        type: ControlType.String,
        title: "Placeholder",
        defaultValue: "Enter text...",
    },
    componentId: {
        type: ControlType.String,
        title: "Component ID",
        defaultValue: "form-123",
        description: "Unique identifier for this form (auto-generated if empty)",
    },
    showButton: {
        type: ControlType.Boolean,
        title: "Show Button",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },
    buttonText: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Submit",
        hidden: ({ showButton }) => !showButton,
    },
})
