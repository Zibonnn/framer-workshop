import React from 'react'
import { Link } from 'react-router-dom'
import { Code, Palette, Zap } from 'lucide-react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Zap className="logo-icon" />
          <span className="logo-text">Framer Components</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">
            <Palette className="nav-icon" />
            Components
          </Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
          >
            <Code className="nav-icon" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
