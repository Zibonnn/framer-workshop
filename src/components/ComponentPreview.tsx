import React from 'react'
import FormBuilder from './FormBuilder'
import Button from './Button'
import Card from './Card'
import './ComponentPreview.css'

interface ComponentPreviewProps {
  componentName: string
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ componentName }) => {
  const renderComponent = () => {
    switch (componentName) {
      case 'FormBuilder':
        return (
          <div className="preview-container">
            <FormBuilder
              fieldType="text"
              label="Email Address"
              placeholder="Enter your email"
              required={true}
              showChips={true}
              chipSuggestions={['user@example.com', 'admin@company.com', 'support@help.com']}
              backgroundColor="#FFFFFF"
              borderColor="#E5E7EB"
              focusColor="#3B82F6"
              textColor="#111827"
              labelColor="#374151"
              borderRadius={8}
              paddingTop={12}
              paddingRight={16}
              paddingBottom={12}
              paddingLeft={16}
              showClearButton={true}
              clearButtonColor="#9CA3AF"
            />
          </div>
        )
      
      case 'Button':
        return (
          <div className="preview-container">
            <div className="button-showcase">
              <Button
                text="Primary Button"
                variant="primary"
                size="medium"
                backgroundColor="#3B82F6"
                textColor="#FFFFFF"
                borderColor="#3B82F6"
                hoverBackgroundColor="#2563EB"
                borderRadius={8}
                paddingTop={12}
                paddingRight={24}
                paddingBottom={12}
                paddingLeft={24}
              />
              <Button
                text="Secondary Button"
                variant="secondary"
                size="medium"
                backgroundColor="#F3F4F6"
                textColor="#374151"
                borderColor="#D1D5DB"
                hoverBackgroundColor="#E5E7EB"
                borderRadius={8}
                paddingTop={12}
                paddingRight={24}
                paddingBottom={12}
                paddingLeft={24}
              />
              <Button
                text="Outline Button"
                variant="outline"
                size="medium"
                backgroundColor="transparent"
                textColor="#3B82F6"
                borderColor="#3B82F6"
                hoverBackgroundColor="#EFF6FF"
                borderRadius={8}
                paddingTop={12}
                paddingRight={24}
                paddingBottom={12}
                paddingLeft={24}
              />
            </div>
          </div>
        )
      
      case 'Card':
        return (
          <div className="preview-container">
            <Card
              title="Sample Card"
              subtitle="This is a subtitle"
              content="This is a sample card component with customizable content, styling, and interactive elements."
              showTitle={true}
              showSubtitle={true}
              showContent={true}
              showActions={true}
              primaryActionText="Learn More"
              secondaryActionText="Cancel"
              backgroundColor="#FFFFFF"
              borderColor="#E5E7EB"
              borderRadius={12}
              padding={24}
              shadow={true}
              shadowColor="rgba(0, 0, 0, 0.1)"
              shadowBlur={8}
              shadowOffsetX={0}
              shadowOffsetY={4}
              hoverEffect={true}
              hoverScale={1.02}
              hoverShadowBlur={16}
            />
          </div>
        )
      
      default:
        return (
          <div className="preview-container">
            <div className="no-preview">
              <p>No preview available for {componentName}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="component-preview">
      {renderComponent()}
    </div>
  )
}

export default ComponentPreview
