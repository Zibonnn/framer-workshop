// Component URLs for Framer sharing
// In production, these would be the actual published Framer component URLs
export const componentUrls: Record<string, string> = {
  FormBuilder: 'https://framer.com/design/your-project/formbuilder',
  Button: 'https://framer.com/design/your-project/button',
  Card: 'https://framer.com/design/your-project/card',
  FormWithButton: 'https://framer.com/design/your-project/formwithbutton',
  FormWithLinkedButton: 'https://framer.com/design/your-project/formwithlinkedbutton',
  FormButtonLink: 'https://framer.com/design/your-project/formbuttonlink',
}

// Instructions for setting up component URLs in production:
/*
1. Publish your components to Framer:
   - Open each component in Framer
   - Go to Assets panel
   - Click the three dots (...) next to component name
   - Select "Copy URL"
   - Update the URLs above with the actual URLs

2. For direct Framer integration:
   - Use Framer's official component sharing API
   - Implement proper authentication
   - Handle component versioning
   - Add component metadata (description, tags, etc.)
*/
