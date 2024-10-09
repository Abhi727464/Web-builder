# Web Page Builder

### Project Setup

1. **Set Up of Project Structure**

   - Created the necessary directories and files:

     ```
     src/
     ├── components/
     │   ├── Canvas.js
     │   ├── Toolbar.js
     │   ├── TextEditor.js
     │   ├── ImageComponent.js
     │   └── ButtonComponent.js
     |   └── helper/
     |      └── Helper.js
     |
     ├── App.js
     ├── index.js
     └── App.css

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

## Features

- **Drag-and-Drop** components onto the canvas.
- **Text**, **Image**, and **Button** components.
- **Edit Mode** and **Preview Mode** for building and viewing pages.
- Ability to **remove** components from the canvas.
- Components are constrained within the canvas to prevent overflow.

## Technologies Used

- **React**: Front-end framework for building the UI.
- **react-dnd**: Drag-and-drop functionality.
- **HTML5 and CSS3**: For structuring and styling the web page.
- **JavaScript (ES6+)**: Logic implementation.
- **React Hooks**: For managing state and lifecycle methods.
