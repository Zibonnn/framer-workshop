# Framer Component Sharing Setup

This document explains how to set up proper Framer component sharing for the showcase website.

## Current Implementation

The showcase currently provides two ways to copy components:

1. **Code Copy**: Copies the component source code with instructions
2. **URL Copy**: (Future) Copies Framer component URLs for direct import

## Setting Up Framer Component URLs

### Step 1: Publish Components to Framer

1. **Open each component in Framer**:
   - FormBuilder
   - Button  
   - Card
   - FormWithButton
   - FormWithLinkedButton
   - FormButtonLink

2. **Get the component URL**:
   - Go to the **Assets** panel in Framer
   - Find your component
   - Click the three dots (...) next to the component name
   - Select **"Copy URL"**
   - This copies the component's unique URL

3. **Update the URLs**:
   - Edit `src/data/componentUrls.ts`
   - Replace the placeholder URLs with the actual Framer component URLs

### Step 2: Test the Integration

1. **Copy a component** from the showcase
2. **Open Framer** in a new project
3. **Paste the URL** anywhere in your project
4. **The component should appear** automatically

## Advanced Setup (Optional)

### Using Framer's Official API

For production use, consider implementing:

1. **Component Publishing API**: Automatically publish components to Framer
2. **Authentication**: Handle user authentication for private components
3. **Versioning**: Manage component versions and updates
4. **Metadata**: Include component descriptions, tags, and usage examples

### Example Implementation

```typescript
// Example of how to implement automatic component publishing
const publishComponentToFramer = async (componentName: string, code: string) => {
  const response = await fetch('https://api.framer.com/v1/components', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FRAMER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: componentName,
      code: code,
      description: 'Component from showcase',
      tags: ['showcase', 'custom'],
    }),
  });
  
  const result = await response.json();
  return result.url; // This is the component URL
};
```

## Current Status

- ✅ **Code Copy**: Working - copies component code with instructions
- ⏳ **URL Copy**: Ready for implementation - needs published component URLs
- ✅ **User Instructions**: Clear step-by-step instructions provided
- ✅ **Fallback System**: Gracefully handles both code and URL copying

## Next Steps

1. **Publish components** to Framer and get their URLs
2. **Update** `src/data/componentUrls.ts` with real URLs
3. **Test** the URL copying functionality
4. **Consider** implementing automatic component publishing
5. **Add** component versioning and update notifications

## Benefits of URL-based Sharing

- **One-click import**: Users just paste the URL
- **Automatic updates**: Components update when the source changes
- **No code copying**: Eliminates the need to copy/paste code
- **Better UX**: Seamless integration with Framer's workflow
- **Version control**: Framer handles component versions automatically
