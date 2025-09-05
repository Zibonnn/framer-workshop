'use client'

import { useState } from 'react'
import Header from '../components/Header'
import ComponentGallery from '../pages/ComponentGallery'
import ComponentDetail from '../pages/ComponentDetail'
import { components } from '../data/components'

export default function Home() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId)
  }

  const handleBack = () => {
    setSelectedComponent(null)
  }

  const selectedComponentData = selectedComponent 
    ? components.find(comp => comp.id === selectedComponent)
    : null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header />
      <main className="container" style={{ paddingTop: '100px', paddingBottom: '32px' }}>
        {selectedComponentData ? (
          <ComponentDetail 
            component={selectedComponentData} 
            onBack={handleBack}
          />
        ) : (
          <ComponentGallery onComponentSelect={handleComponentSelect} />
        )}
      </main>
    </div>
  )
}
