import React from "react"
import { addPropertyControls, ControlType } from "framer"

interface NoImportGlobalStateProps {
  // This component doesn't need any props, it just provides global state functionality
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function NoImportGlobalState(props: NoImportGlobalStateProps) {
  // This component is invisible but provides global state functionality
  return null
}

// Very simple global state - just use a plain object
let globalState: any = {}

// Helper functions for global state management
export const setComponentData = (id: string, type: 'form' | 'button', data: any) => {
  globalState[id] = { id, type, data }
  console.log(`GlobalState: Set data for ${id}:`, data)
}

export const getComponentData = (id: string) => {
  return globalState[id]
}

export const subscribeToComponent = (id: string, callback: (data: any) => void) => {
  console.log(`GlobalState: Subscribed to ${id}`)
  // Simple implementation - just log for now
}

export const unsubscribeFromComponent = (id: string, callback: (data: any) => void) => {
  console.log(`GlobalState: Unsubscribed from ${id}`)
  // Simple implementation - just log for now
}

addPropertyControls(NoImportGlobalState, {
  // No visible controls needed for this component
})
