# WYSIWYG Web Page Builder

A **WYSIWYG (What You See Is What You Get)** web page builder built with **React** and **react-dnd** for drag-and-drop functionality. This project allows users to drag and drop components such as text boxes, buttons, and images onto a canvas to create dynamic web pages.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## File Structure

src/
├── components/ # All reusable components for the project
│ ├── ButtonComponent.js # Button component for drag-and-drop
│ ├── Canvas.js # Canvas component that handles the drag-and-drop layout
│ ├── DraggableComponent.js # Wrapper component to make elements draggable
│ ├── ImageComponent.js # Image component for drag-and-drop
│ ├── TextEditor.js # Text editor component for drag-and-drop
│ ├── Toolbar.js # Toolbar containing options to drag components onto canvas
│ └── helper/ # Helper functions and constants
│ └── Helper.js # Helper file (used for item types, utility functions)
│
├── App.js # Main application component
├── App.css # Global styles for the app
├── index.js # Entry point for the React app
├── index.css # Global CSS file
├── reportWebVitals.js # Optional performance measurement utility
└── setupTests.js # Configuration for tests (if applicable)

## Project Overview

The WYSIWYG Web Page Builder provides an interface for creating web pages by dragging and dropping elements (text, images, and buttons) onto a canvas. Once dropped, elements can be repositioned and resized. The project also supports two modes:

- **Edit Mode**: Allows users to drag, drop, and move elements around the canvas.
- **Preview Mode**: Displays the built page without the ability to interact with or edit the elements.

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

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v12 or higher)
- **npm** (v6 or higher) or **yarn** (v1.x or higher)

### Steps to Install

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-repository-url.git
   cd wysiwyg-web-page-builder
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Usage

To run the project locally, use the following command:

```bash
npm start
```
