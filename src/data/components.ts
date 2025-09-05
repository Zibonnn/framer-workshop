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
    name: 'FormWithButton',
    description: 'A simple composite component that combines FormBuilder with Button for easy form submission.',
    tags: ['form', 'button', 'composite', 'simple', 'linked'],
    features: [
      'Form and button combination',
      'Easy to use interface',
      'Configurable form field types',
      'Button variant selection',
      'Responsive layout',
      'Clean component structure'
    ],
    category: 'Composite',
    complexity: 'simple'
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
  },
  {
    name: 'IDLinkingExample',
    description: 'Demonstrates ID-based component linking that works anywhere in Framer, regardless of frame nesting.',
    tags: ['form', 'button', 'linking', 'id-based', 'flexible', 'anywhere'],
    features: [
      'ID-based component linking',
      'Works across any frame nesting level',
      'Cross-page communication',
      'Simple string-based setup',
      'Visual instructions',
      'Multiple layout options',
      'Real-time linking feedback'
    ],
    category: 'Composite',
    complexity: 'medium'
  },
  {
    name: 'LinkingTest',
    description: 'Test component for verifying ID-based linking functionality with different test modes.',
    tags: ['form', 'button', 'linking', 'test', 'debug', 'verification'],
    features: [
      'Multiple test modes (simple, advanced, custom)',
      'Pre-configured ID examples',
      'Visual test feedback',
      'Debug information display',
      'Easy verification process',
      'Custom ID testing',
      'Real-time status updates'
    ],
    category: 'Testing',
    complexity: 'simple'
  },
  {
    name: 'SimpleLinkingExample',
    description: 'A simplified example demonstrating ID-based component linking that works anywhere in Framer.',
    tags: ['form', 'button', 'linking', 'simple', 'id-based', 'example'],
    features: [
      'Simple ID-based linking setup',
      'Visual instructions and feedback',
      'Pre-configured component IDs',
      'Easy to understand and implement',
      'Works across any frame nesting',
      'Clean and minimal interface',
      'Real-time linking demonstration'
    ],
    category: 'Composite',
    complexity: 'simple'
  },
  {
    name: 'GlobalState',
    description: 'A global state management component that enables communication between FormBuilder and Button components.',
    tags: ['state', 'management', 'global', 'communication', 'invisible'],
    features: [
      'Global state management for component linking',
      'Invisible component that provides functionality',
      'Enables communication between any components',
      'Singleton pattern for consistent state',
      'Subscribe/unsubscribe functionality',
      'Automatic cleanup and memory management',
      'Works with any Framer component'
    ],
    category: 'Utility',
    complexity: 'medium'
  }
]
