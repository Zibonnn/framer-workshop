'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import './ComponentPreview.css'

// Dynamically import Framer components to avoid SSR issues
const FormBuilder = dynamic(() => import('./FormBuilderOrg'), { ssr: false })
const Button = dynamic(() => import('./Button'), { ssr: false })
const Card = dynamic(() => import('./Card'), { ssr: false })
const FormWithButton = dynamic(() => import('./FormWithButton'), { ssr: false })
const FormWithLinkedButton = dynamic(() => import('./FormWithLinkedButton'), { ssr: false })
const FormButtonLink = dynamic(() => import('./FormButtonLink'), { ssr: false })
const IDLinkingExample = dynamic(() => import('./IDLinkingExample'), { ssr: false })
const LinkingTest = dynamic(() => import('./LinkingTest'), { ssr: false })
const SimpleLinkingExample = dynamic(() => import('./SimpleLinkingExample'), { ssr: false })
const GlobalState = dynamic(() => import('./GlobalState'), { ssr: false })

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
              showLabel={true}
              placeholder="Enter your email"
              placeholderColor="#9CA3AF"
              required={true}
              showChips={!isModal}
              chipSuggestions={isModal ? ['user@example.com', 'admin@company.com', 'support@help.com', 'test@demo.com'] : ['user@example.com', 'admin@company.com']}
              backgroundColor="#FFFFFF"
              borderColor="#E5E7EB"
              focusColor="#3B82F6"
              textColor="#111827"
              labelColor="#374151"
              borderRadius="8px"
              heightMode="fixed"
              height={40}
              padding={isModal ? "12px 16px" : "10px 12px"}
              showClearButton={true}
              clearButtonColor="#9CA3AF"
              showButton={isModal}
              buttonText="Submit"
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
                  disabled={false}
                  loading={false}
                  fullWidth={false}
                  externalDisabled={false}
                  borderRadius="6px"
                  padding="8px 16px"
                />
                <Button
                  text="Secondary"
                  variant="secondary"
                  size="small"
                  disabled={false}
                  loading={false}
                  fullWidth={false}
                  externalDisabled={false}
                  borderRadius="6px"
                  padding="8px 16px"
                />
              </div>
              <div className="button-row">
                <Button
                  text="Outline"
                  variant="outline"
                  size="small"
                  disabled={false}
                  loading={false}
                  fullWidth={false}
                  externalDisabled={false}
                  borderRadius="6px"
                  padding="8px 16px"
                />
                <Button
                  text="Loading..."
                  variant="primary"
                  size="small"
                  disabled={false}
                  loading={true}
                  fullWidth={false}
                  externalDisabled={false}
                  borderRadius="6px"
                  padding="8px 16px"
                />
              </div>
            </div>
          </div>
        )
      
      case 'FormWithButton':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <FormWithButton
              formFieldType="text"
              formLabel={isModal ? "Email Address" : "Email"}
              formPlaceholder={isModal ? "Enter your email address..." : "Enter email..."}
              buttonText={isModal ? "Subscribe" : "Submit"}
              buttonVariant="primary"
            />
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
      
      case 'IDLinkingExample':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <IDLinkingExample
              formId={isModal ? "modal-form-123" : "gallery-form-123"}
              buttonId={isModal ? "modal-button-456" : "gallery-button-456"}
              showInstructions={isModal}
              layout={isModal ? "side-by-side" : "stacked"}
            />
          </div>
        )
      
      case 'LinkingTest':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <LinkingTest
              testMode={isModal ? "advanced" : "simple"}
              formId={isModal ? "test-form-advanced" : "test-form-simple"}
              buttonId={isModal ? "test-button-advanced" : "test-button-simple"}
            />
          </div>
        )
      
      case 'SimpleLinkingExample':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <SimpleLinkingExample
              formId={isModal ? "modal-simple-form" : "gallery-simple-form"}
              buttonId={isModal ? "modal-simple-button" : "gallery-simple-button"}
              showInstructions={isModal}
            />
          </div>
        )
      
      case 'GlobalState':
        return (
          <div className={`preview-container ${isModal ? 'modal-preview' : 'gallery-preview'}`}>
            <div style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              color: "#6B7280"
            }}>
              <h3>Global State Manager</h3>
              <p>This component provides global state management for component linking.</p>
              <p>It's invisible but enables communication between FormBuilder and Button components.</p>
            </div>
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
