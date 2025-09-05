'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import './ComponentPreview.css'

// Dynamically import Framer components to avoid SSR issues
const FormBuilder = dynamic(() => import('./FormBuilder'), { ssr: false })
const Button = dynamic(() => import('./Button'), { ssr: false })
const Card = dynamic(() => import('./Card'), { ssr: false })
const FormWithLinkedButton = dynamic(() => import('./FormWithLinkedButton'), { ssr: false })
const FormButtonLink = dynamic(() => import('./FormButtonLink'), { ssr: false })

interface ComponentPreviewProps {
  componentName: string
  isModal?: boolean
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ componentName, isModal = false }) => {
  const renderComponent = () => {
    switch (componentName) {
      case 'FormBuilder':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <FormBuilder
              fieldType="text"
              label="Email Address"
              placeholder="Enter your email"
              required={true}
              showChips={!isModal}
              chipSuggestions={isModal ? ['user@example.com', 'admin@company.com', 'support@help.com', 'test@demo.com'] : ['user@example.com', 'admin@company.com']}
              backgroundColor="#FFFFFF"
              borderColor="#E5E7EB"
              focusColor="#3B82F6"
              textColor="#111827"
              labelColor="#374151"
              borderRadius={8}
              paddingTop={isModal ? 12 : 10}
              paddingRight={isModal ? 16 : 12}
              paddingBottom={isModal ? 12 : 10}
              paddingLeft={isModal ? 16 : 12}
              showClearButton={true}
              clearButtonColor="#9CA3AF"
            />
          </div>
        )
      
      case 'Button':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <div className="button-showcase">
              <div className="button-row">
                <Button
                  text="Primary"
                  variant="primary"
                  size="small"
                  backgroundColor="#3B82F6"
                  textColor="#FFFFFF"
                  borderColor="#3B82F6"
                  hoverBackgroundColor="#2563EB"
                  borderRadius={6}
                  paddingTop={8}
                  paddingRight={16}
                  paddingBottom={8}
                  paddingLeft={16}
                />
                <Button
                  text="Secondary"
                  variant="secondary"
                  size="small"
                  backgroundColor="#F3F4F6"
                  textColor="#374151"
                  borderColor="#D1D5DB"
                  hoverBackgroundColor="#E5E7EB"
                  borderRadius={6}
                  paddingTop={8}
                  paddingRight={16}
                  paddingBottom={8}
                  paddingLeft={16}
                />
              </div>
              <div className="button-row">
                <Button
                  text="Outline"
                  variant="outline"
                  size="small"
                  backgroundColor="transparent"
                  textColor="#3B82F6"
                  borderColor="#3B82F6"
                  hoverBackgroundColor="#EFF6FF"
                  borderRadius={6}
                  paddingTop={8}
                  paddingRight={16}
                  paddingBottom={8}
                  paddingLeft={16}
                />
                <Button
                  text="Loading..."
                  variant="primary"
                  size="small"
                  loading={true}
                  backgroundColor="#3B82F6"
                  textColor="#FFFFFF"
                  borderColor="#3B82F6"
                  hoverBackgroundColor="#2563EB"
                  borderRadius={6}
                  paddingTop={8}
                  paddingRight={16}
                  paddingBottom={8}
                  paddingLeft={16}
                />
              </div>
            </div>
          </div>
        )
      
      case 'Card':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <Card
              title="Sample Card"
              subtitle="This is a subtitle"
              content={isModal ? "This is a sample card component with customizable content, styling, and interactive elements. Perfect for displaying information in an organized way." : "This is a sample card component with customizable content and styling options."}
              showTitle={true}
              showSubtitle={true}
              showContent={true}
              showActions={isModal}
              primaryActionText="Learn More"
              secondaryActionText="Cancel"
              backgroundColor="#FFFFFF"
              borderColor="#E5E7EB"
              borderRadius={8}
              padding={isModal ? 20 : 12}
              shadow={true}
              shadowColor="rgba(0, 0, 0, 0.1)"
              shadowBlur={4}
              shadowOffsetX={0}
              shadowOffsetY={2}
              hoverEffect={false}
              hoverScale={1.0}
              hoverShadowBlur={4}
            />
          </div>
        )
      
      case 'FormWithLinkedButton':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <FormWithLinkedButton
              linkType={isModal ? "motion" : "pulse"}
              formProps={{
                fieldType: "text",
                label: isModal ? "Your Message" : "Message",
                placeholder: isModal ? "Type your message here..." : "Type here..."
              }}
              buttonProps={{
                text: isModal ? "Submit Message" : "Submit",
                variant: "primary",
                size: isModal ? "medium" : "small"
              }}
            />
          </div>
        )
      
      case 'FormButtonLink':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <FormButtonLink
              formLabel={isModal ? "Contact Form" : "Message"}
              formPlaceholder={isModal ? "Enter your message..." : "Type here..."}
              formFieldType="text"
              buttonText={isModal ? "Send Message" : "Send"}
              buttonVariant="primary"
              buttonSize={isModal ? "medium" : "small"}
              linkBehavior={isModal ? "animate" : "pulse"}
              animationDuration={0.5}
            />
          </div>
        )
      
      default:
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <div className="no-preview">
              <p>No preview available for {componentName}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`component-preview ${isModal ? 'modal-component-preview' : 'gallery-component-preview'}`}>
      <Suspense fallback={<div className="loading-preview">Loading component...</div>}>
        {renderComponent()}
      </Suspense>
    </div>
  )
}

export default ComponentPreview
