'use client'

import React, { useState } from 'react'
import { ArrowLeft, Copy, Download, Code, Palette } from 'lucide-react'
import ComponentPreview from '../components/ComponentPreview'
import CodeViewer from '../components/CodeViewer'
import './ComponentDetail.css'

interface ComponentDetailProps {
  component: any
  onBack: () => void
}

const ComponentDetail: React.FC<ComponentDetailProps> = ({ component, onBack }) => {
  const [showCode, setShowCode] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

  if (!component) {
    return (
      <div className="component-detail">
        <div className="not-found">
          <h2>Component not found</h2>
          <button onClick={onBack} className="back-link">
            <ArrowLeft className="back-icon" />
            Back to Gallery
          </button>
        </div>
      </div>
    )
  }

  const handleCopyCode = async () => {
    try {
      const response = await fetch(`/src/components/${component.name}.tsx`)
      const code = await response.text()
      await navigator.clipboard.writeText(code)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownloadCode = async () => {
    try {
      const response = await fetch(`/src/components/${component.name}.tsx`)
      const code = await response.text()
      const blob = new Blob([code], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${component.name}.tsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download code:', error)
    }
  }

  return (
    <div className="component-detail">
      <div className="detail-header">
        <button onClick={onBack} className="back-link">
          <ArrowLeft className="back-icon" />
          Back to Gallery
        </button>
        
        <div className="detail-title">
          <h1>{component.name}</h1>
          <p className="detail-description">{component.description}</p>
        </div>
        
        <div className="detail-actions">
          <button
            className="action-btn primary"
            onClick={handleCopyCode}
          >
            <Copy className="btn-icon" />
            Copy Code
          </button>
          
          <button
            className="action-btn secondary"
            onClick={handleDownloadCode}
          >
            <Download className="btn-icon" />
            Download
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Palette className="tab-icon" />
            Preview
          </button>
          
          <button
            className={`tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <Code className="tab-icon" />
            Code
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'preview' ? (
            <div className="preview-container">
              <ComponentPreview componentName={component.name} isModal={true} />
            </div>
          ) : (
            <div className="code-container">
              <CodeViewer />
            </div>
          )}
        </div>
      </div>

      <div className="component-info">
        <div className="info-section">
          <h3>Features</h3>
          <ul className="features-list">
            {component.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        
        <div className="info-section">
          <h3>Tags</h3>
          <div className="tags">
            {component.tags.map((tag: string, index: number) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="info-section">
          <h3>Usage</h3>
          <p className="usage-text">
            Simply copy the component code and paste it into your Framer project. 
            The component includes all necessary property controls for easy customization.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ComponentDetail
