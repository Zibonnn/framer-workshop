import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Eye, Download, Search } from 'lucide-react'
import { components } from '../data/components'
import ComponentPreview from '../components/ComponentPreview'
import CodeViewer from '../components/CodeViewer'
import './ComponentGallery.css'

const ComponentGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showCode, setShowCode] = useState(false)

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCopyCode = async (componentName: string) => {
    try {
      const response = await fetch(`/src/components/${componentName}.tsx`)
      const code = await response.text()
      await navigator.clipboard.writeText(code)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownloadCode = async (componentName: string) => {
    try {
      const response = await fetch(`/src/components/${componentName}.tsx`)
      const code = await response.text()
      const blob = new Blob([code], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${componentName}.tsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download code:', error)
    }
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1 className="gallery-title">Framer Components Showcase</h1>
        <p className="gallery-description">
          Discover, preview, and copy custom Framer components. Click on any component to view details and get the code.
        </p>
        
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="components-grid">
        {filteredComponents.map((component) => (
          <div key={component.name} className="component-card">
            <div className="component-preview">
              <ComponentPreview componentName={component.name} />
            </div>
            
            <div className="component-info">
              <h3 className="component-name">{component.name}</h3>
              <p className="component-description">{component.description}</p>
              
              <div className="component-tags">
                {component.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="component-actions">
              <button
                className="action-btn primary"
                onClick={() => setSelectedComponent(component.name)}
              >
                <Eye className="btn-icon" />
                Preview
              </button>
              
              <button
                className="action-btn secondary"
                onClick={() => setShowCode(true)}
              >
                <Copy className="btn-icon" />
                View Code
              </button>
              
              <button
                className="action-btn secondary"
                onClick={() => handleCopyCode(component.name)}
              >
                <Download className="btn-icon" />
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedComponent && (
        <div className="modal-overlay" onClick={() => setSelectedComponent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedComponent}</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedComponent(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <ComponentPreview componentName={selectedComponent} />
            </div>
          </div>
        </div>
      )}

      {showCode && (
        <div className="modal-overlay" onClick={() => setShowCode(false)}>
          <div className="modal code-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Component Code</h2>
              <button
                className="close-btn"
                onClick={() => setShowCode(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <CodeViewer />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComponentGallery
