// Simple global state for component linking
// This avoids complex import issues with Framer components

interface ComponentState {
  id: string
  type: 'form' | 'button'
  data: any
  timestamp: number
}

class SimpleLinker {
  private static instance: SimpleLinker
  private components: Map<string, ComponentState> = new Map()
  private listeners: Map<string, Set<(data: any) => void>> = new Map()

  static getInstance(): SimpleLinker {
    if (!SimpleLinker.instance) {
      SimpleLinker.instance = new SimpleLinker()
    }
    return SimpleLinker.instance
  }

  // Register a component
  register(id: string, type: 'form' | 'button', data: any) {
    const componentState: ComponentState = {
      id,
      type,
      data,
      timestamp: Date.now()
    }
    
    this.components.set(id, componentState)
    this.notifyListeners(id, data)
  }

  // Get component data
  get(id: string): ComponentState | undefined {
    return this.components.get(id)
  }

  // Subscribe to updates
  subscribe(id: string, callback: (data: any) => void) {
    if (!this.listeners.has(id)) {
      this.listeners.set(id, new Set())
    }
    this.listeners.get(id)!.add(callback)
  }

  // Unsubscribe
  unsubscribe(id: string, callback: (data: any) => void) {
    const listeners = this.listeners.get(id)
    if (listeners) {
      listeners.delete(callback)
    }
  }

  // Notify listeners
  private notifyListeners(id: string, data: any) {
    const listeners = this.listeners.get(id)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }

  // Clear all data
  clear() {
    this.components.clear()
    this.listeners.clear()
  }
}

export default SimpleLinker.getInstance()
