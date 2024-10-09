# web_page_builder

### Project Setup

1.  **Set Up of Project Structure**

    - Create the necessary directories and files:
      ```     src/
├── components/              # Reusable components
│   ├── ButtonComponent.js    # Button component for drag-and-drop functionality
│   ├── Canvas.js             # Main canvas area where components are dropped and arranged
│   ├── DraggableComponent.js # Wrapper component that enables drag-and-drop for other elements
│   ├── ImageComponent.js     # Image component for drag-and-drop
│   ├── TextEditor.js         # Text editor component for adding and editing text
│   ├── Toolbar.js            # Toolbar that allows users to select components to drag
│   └── helper/               # Helper functions and constants
│       └── Helper.js         # Utilities like`ItemTypes` for managing drag-and-drop logic
      │
      ├── App.js # Main application component
      ├── App.css # Global CSS styles
      ├── index.js # React entry point
      ├── index.css # Global CSS styles
      ├── reportWebVitals.js # Performance measurement utility
      └── setupTests.js # Test setup configuration

           ```

### Documentation

# WYSIWYG Web Page Builder

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd wysiwyg-web-page-builder
   ```

2. Install dependencies:

   ```bash
   npm install or yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev or yarn run dev
   ```

## Usage

- Drag and drop components from the toolbar onto the canvas.
- Edit text directly on the canvas.
- Use the toggle button to switch between design mode and preview mode.
