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
  }
]
