import React, { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import './CodeViewer.css'

const CodeViewer: React.FC = () => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // In a real app, you'd fetch the actual component code
    // For now, we'll show a sample
    const sampleCode = `import React, { useState, useCallback, startTransition } from "react"
import { addPropertyControls, ControlType } from "framer"
import { type CSSProperties } from "react"

interface ButtonProps {
  text: string
  variant: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size: "small" | "medium" | "large"
  disabled: boolean
  loading: boolean
  fullWidth: boolean
  // ... more props
}

export default function Button(props: ButtonProps) {
  const {
    text = "Button",
    variant = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    fullWidth = false,
    // ... more destructuring
  } = props

  const [isHovered, setIsHovered] = useState(false)

  const handleClick = useCallback(() => {
    if (!disabled && !loading && onClick) {
      startTransition(() => onClick())
    }
  }, [disabled, loading, onClick])

  // ... component logic

  return (
    <button
      style={{
        // ... styles
      }}
      onClick={handleClick}
      disabled={disabled || loading}
      type="button"
    >
      {loading ? renderLoadingSpinner() : text}
    </button>
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
  // ... more controls
})`

    setCode(sampleCode)
    setLoading(false)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  if (loading) {
    return (
      <div className="code-viewer">
        <div className="code-header">
          <h3>Component Code</h3>
          <div className="loading">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="code-viewer">
      <div className="code-header">
        <h3>Component Code</h3>
        <button
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? <Check className="btn-icon" /> : <Copy className="btn-icon" />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      
      <div className="code-content">
        <SyntaxHighlighter
          language="typescript"
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
          showLineNumbers
          wrapLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeViewer
