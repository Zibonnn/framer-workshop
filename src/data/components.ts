export interface Component {
  name: string
  description: string
  tags: string[]
  features: string[]
  category: string
  complexity: 'simple' | 'medium' | 'complex'
}

export const components: Component[] = [
  {
    name: 'FormBuilder',
    description: 'A comprehensive form component with multiple input types, chip suggestions, and extensive customization options.',
    tags: ['form', 'input', 'validation', 'chips', 'customizable'],
    features: [
      'Multiple input types (text, textarea, dropdown, radio, chips)',
      'Chip suggestions with selection/deselection',
      'Icon support (before/after)',
      'Clear button functionality',
      'Extensive styling options',
      'Font customization',
      'Responsive design'
    ],
    category: 'Forms',
    complexity: 'complex'
  },
  {
    name: 'Button',
    description: 'A versatile button component with multiple variants, sizes, and interactive states.',
    tags: ['button', 'interactive', 'variants', 'loading', 'icons'],
    features: [
      'Multiple variants (primary, secondary, outline, ghost, danger)',
      'Three sizes (small, medium, large)',
      'Loading state with spinner',
      'Icon support with positioning',
      'Hover effects',
      'Disabled state',
      'Full width option'
    ],
    category: 'Interactive',
    complexity: 'medium'
  },
  {
    name: 'Card',
    description: 'A flexible card component perfect for displaying content with optional images and actions.',
    tags: ['card', 'layout', 'content', 'image', 'actions'],
    features: [
      'Flexible content layout',
      'Image positioning (top, bottom, left, right)',
      'Action buttons',
      'Hover effects and animations',
      'Shadow customization',
      'Typography controls',
      'Responsive design'
    ],
    category: 'Layout',
    complexity: 'medium'
  },
  {
    name: 'FormWithLinkedButton',
    description: 'A composite component that links FormBuilder with Button using Framer Motion for advanced interactions.',
    tags: ['form', 'button', 'motion', 'animation', 'linked', 'composite'],
    features: [
      'Form and button linking',
      'Motion animations (scale, rotate, opacity)',
      'State management between components',
      'Event triggering',
      'Loading states',
      'Multiple link types',
      'Customizable animations'
    ],
    category: 'Composite',
    complexity: 'complex'
  },
  {
    name: 'FormButtonLink',
    description: 'A simplified approach to linking forms with buttons using Framer Motion values and transforms.',
    tags: ['form', 'button', 'motion', 'binding', 'simple', 'linked'],
    features: [
      'Motion value binding',
      'Transform animations',
      'Auto-enable/disable based on form content',
      'Pulse and scale effects',
      'Real-time state feedback',
      'Debug information display',
      'Customizable animation duration'
    ],
    category: 'Composite',
    complexity: 'medium'
  }
]
