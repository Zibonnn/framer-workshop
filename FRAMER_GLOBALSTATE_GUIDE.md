# Framer GlobalState Component Guide

## 🎯 **Problem Solved!**

You're absolutely right - Framer only works with `.tsx` files! I've created a proper `GlobalState.tsx` component that can be used in Framer to enable component linking.

## **What is GlobalState.tsx?**

The `GlobalState.tsx` is a **Framer-compatible component** that provides global state management for component linking. It's an **invisible component** that enables communication between FormBuilder and Button components.

## **How to Use in Framer:**

### **Step 1: Add GlobalState Component**
1. **Copy the `GlobalState.tsx` code** to Framer
2. **Create a new component** in Framer
3. **Paste the code** into the component
4. **Save the component**

### **Step 2: Add GlobalState to Your Project**
1. **Place GlobalState component** anywhere in your Framer project
2. **It's invisible** - you won't see it, but it provides functionality
3. **Only one instance needed** per project

### **Step 3: Use with FormBuilder and Button**
1. **Add FormBuilder** with a `componentId` (e.g., "my-form-123")
2. **Add Button** with `linkedFormId` set to the same ID
3. **They'll automatically communicate** through the GlobalState

## **Component Structure:**

```tsx
// GlobalState.tsx - Framer Component
export default function GlobalState() {
  return null // Invisible component
}

// Exports for other components to use:
export const setComponentData = (id, type, data) => { ... }
export const subscribeToComponent = (id, callback) => { ... }
export const unsubscribeFromComponent = (id, callback) => { ... }
```

## **Real-World Usage:**

### **Example 1: Basic Setup**
```
Framer Project:
├── GlobalState (invisible, anywhere)
├── FormBuilder (Component ID: "contact-form")
└── Button (Linked Form ID: "contact-form")
```

### **Example 2: Multiple Forms**
```
Framer Project:
├── GlobalState (invisible, anywhere)
├── FormBuilder 1 (Component ID: "form-1")
├── FormBuilder 2 (Component ID: "form-2")
├── Button 1 (Linked Form ID: "form-1")
└── Button 2 (Linked Form ID: "form-2")
```

### **Example 3: Cross-Page Communication**
```
Page 1:
├── GlobalState (invisible)
└── FormBuilder (Component ID: "signup-form")

Page 2:
└── Button (Linked Form ID: "signup-form")
```

## **Properties Available:**

### **FormBuilder Properties:**
- **Component ID**: Unique identifier (e.g., "my-form-123")
- **Linked Button ID**: ID of button to link with
- **All existing FormBuilder properties**

### **Button Properties:**
- **Linked Form ID**: ID of form to link with
- **All existing Button properties**

### **GlobalState Properties:**
- **No visible properties** (invisible component)
- **Automatically manages state** for all linked components

## **How It Works:**

1. **GlobalState creates a singleton** state manager
2. **FormBuilder registers** its data with the state manager
3. **Button subscribes** to form updates
4. **Real-time communication** happens automatically
5. **Works across any distance** in Framer

## **Benefits:**

✅ **Framer Compatible**: Uses `.tsx` format that Framer supports
✅ **Invisible**: Doesn't clutter your design
✅ **Global**: Works across any frame, page, or nesting level
✅ **Automatic**: No manual setup required
✅ **Efficient**: Singleton pattern prevents memory leaks
✅ **Flexible**: Can link any number of components

## **Setup Instructions:**

### **For New Projects:**
1. **Add GlobalState component** to Framer
2. **Place it anywhere** in your project (invisible)
3. **Add FormBuilder and Button** components
4. **Set their IDs** to link them
5. **Test the linking** by typing in the form

### **For Existing Projects:**
1. **Add GlobalState component** to Framer
2. **Update FormBuilder** with new code (includes GlobalState import)
3. **Update Button** with new code (includes GlobalState import)
4. **Set up linking** using Component IDs
5. **Test the functionality**

## **Troubleshooting:**

### **Components Not Linking?**
1. **Check GlobalState**: Make sure it's added to your project
2. **Verify IDs**: Ensure Component ID and Linked Form ID match
3. **Check Console**: Look for linking messages in browser console
4. **Test Simple**: Try with basic IDs like "form-1" and "button-1"

### **Import Errors?**
1. **Use .tsx files**: Framer only supports TypeScript React files
2. **Check imports**: Make sure all imports use relative paths
3. **Verify components**: Ensure all components are properly saved in Framer

### **State Not Updating?**
1. **Check GlobalState**: Make sure it's placed in your project
2. **Verify subscriptions**: Button should subscribe to form updates
3. **Test manually**: Try setting IDs and checking console logs

## **Advanced Usage:**

### **Multiple GlobalState Instances:**
- **Only one needed** per project
- **Singleton pattern** ensures consistency
- **Place anywhere** - it's invisible

### **Custom State Management:**
- **Extend GlobalState** for custom functionality
- **Add new methods** for specific use cases
- **Maintain compatibility** with existing components

### **Performance Optimization:**
- **Automatic cleanup** prevents memory leaks
- **Efficient subscriptions** only update when needed
- **Minimal overhead** for invisible component

## **Best Practices:**

1. **Place GlobalState early** in your project setup
2. **Use descriptive IDs** for easy debugging
3. **Test linking** before building complex interactions
4. **Document your IDs** for team members
5. **Use consistent naming** conventions

## **Example Implementation:**

```tsx
// In Framer, create these components:

// 1. GlobalState.tsx (invisible)
// 2. FormBuilder.tsx (with Component ID: "my-form")
// 3. Button.tsx (with Linked Form ID: "my-form")

// Result: Button automatically enables/disables based on form content!
```

The GlobalState component is now **fully Framer-compatible** and ready to use! 🎉

## **Quick Start:**

1. **Copy GlobalState.tsx** to Framer
2. **Copy updated FormBuilder.tsx** to Framer  
3. **Copy updated Button.tsx** to Framer
4. **Place GlobalState** anywhere in your project
5. **Set up linking** with Component IDs
6. **Test the functionality** by typing in forms

**That's it!** Your components can now communicate anywhere in Framer! 🚀
