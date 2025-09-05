import React from "react"
import { addPropertyControls, ControlType } from "framer"

interface GlobalStateProps {
  // This component doesn't need any props, it just provides global state functionality
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function GlobalState(props: GlobalStateProps) {
  // This component is invisible but provides global state functionality
  return null
}

// Simple global state using window object
const globalState = {
  state: new Map<string, any>(),
  listeners: new Map<string, Set<(data: any) => void>>()
}

// Helper functions for global state management
export const setComponentData = (id: string, type: 'form' | 'button', data: any) => {
  globalState.state.set(id, { id, type, data })
  
  // Notify listeners
  const listeners = globalState.listeners.get(id)
  if (listeners) {
    listeners.forEach(callback => callback(data))
  }
}

export const getComponentData = (id: string) => {
  return globalState.state.get(id)
}

export const subscribeToComponent = (id: string, callback: (data: any) => void) => {
  if (!globalState.listeners.has(id)) {
    globalState.listeners.set(id, new Set())
  }
  globalState.listeners.get(id)!.add(callback)
}

export const unsubscribeFromComponent = (id: string, callback: (data: any) => void) => {
  const listeners = globalState.listeners.get(id)
  if (listeners) {
    listeners.delete(callback)
  }
}

addPropertyControls(GlobalState, {
  // No visible controls needed for this component
})
