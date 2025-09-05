import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ComponentGallery from './pages/ComponentGallery'
import ComponentDetail from './pages/ComponentDetail'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ComponentGallery />} />
            <Route path="/component/:componentName" element={<ComponentDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
