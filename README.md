# Framer Components Showcase

A comprehensive showcase website for custom Framer components where users can view, preview, and copy components directly into their Framer projects.

## 🚀 Features

- **Component Gallery**: Browse through a collection of custom Framer components
- **Live Previews**: Interactive previews of each component
- **Code Viewing**: View the complete source code with syntax highlighting
- **One-Click Copy**: Copy component code directly to clipboard
- **Download Support**: Download component files
- **Search & Filter**: Find components by name, description, or tags
- **Responsive Design**: Works perfectly on desktop and mobile

## 📦 Components Included

### FormBuilder
A comprehensive form component with multiple input types and extensive customization options.

**Features:**
- Multiple input types (text, textarea, dropdown, radio, chips)
- Chip suggestions with selection/deselection
- Icon support (before/after)
- Clear button functionality
- Extensive styling options
- Font customization
- Responsive design

### Button
A versatile button component with multiple variants and interactive states.

**Features:**
- Multiple variants (primary, secondary, outline, ghost, danger)
- Three sizes (small, medium, large)
- Loading state with spinner
- Icon support with positioning
- Hover effects
- Disabled state
- Full width option

### Card
A flexible card component perfect for displaying content with optional images and actions.

**Features:**
- Flexible content layout
- Image positioning (top, bottom, left, right)
- Action buttons
- Hover effects and animations
- Shadow customization
- Typography controls
- Responsive design

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer** - Component framework
- **React Router** - Client-side routing
- **Lucide React** - Icons
- **React Syntax Highlighter** - Code display
- **CSS3** - Styling

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd framer-workshop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
framer-workshop/
├── src/
│   ├── components/          # Framer components
│   │   ├── FormBuilder.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Header.tsx
│   │   ├── ComponentPreview.tsx
│   │   └── CodeViewer.tsx
│   ├── pages/              # Application pages
│   │   ├── ComponentGallery.tsx
│   │   └── ComponentDetail.tsx
│   ├── data/               # Component metadata
│   │   └── components.ts
│   ├── styles/             # Global styles
│   │   ├── global.css
│   │   └── App.css
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Using Components in Framer

1. **Browse Components**: Visit the showcase website and find a component you like
2. **View Code**: Click "View Code" to see the complete source code
3. **Copy Code**: Click "Copy Code" to copy the component to your clipboard
4. **Paste in Framer**: Open your Framer project and paste the code into a new component file
5. **Customize**: Use the property controls in Framer to customize the component

## 🔧 Component Development

### Creating New Components

1. Create a new `.tsx` file in `src/components/`
2. Follow the existing component patterns:
   - Use TypeScript interfaces for props
   - Include Framer property controls
   - Add proper JSDoc comments
   - Export as default

3. Add the component to `src/data/components.ts`
4. Update `ComponentPreview.tsx` to include your component

### Component Structure

```typescript
import React, { useState, useCallback, startTransition } from "react"
import { addPropertyControls, ControlType } from "framer"
import { type CSSProperties } from "react"

interface YourComponentProps {
  // Define your props here
}

export default function YourComponent(props: YourComponentProps) {
  // Component logic here
  
  return (
    <div>
      {/* Component JSX here */}
    </div>
  )
}

addPropertyControls(YourComponent, {
  // Define property controls here
})
```

## 🎯 Features in Detail

### Component Gallery
- Grid layout with responsive design
- Search and filter functionality
- Component previews
- Quick action buttons

### Component Detail Pages
- Full component preview
- Tabbed interface (Preview/Code)
- Copy and download functionality
- Component information and features

### Code Viewer
- Syntax highlighting
- Line numbers
- Copy to clipboard
- Responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add new component'`
6. Push to the branch: `git push origin feature/new-component`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Framer team for the amazing component framework
- React team for the excellent UI library
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Happy coding! 🎉**
