import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import "./App.css";

function App() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header>
          <h1>WYSIWYG Page Builder</h1>
          <button
            className="preview-button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? "Switch to Design Mode" : "Switch to Preview Mode"}
          </button>
        </header>
        <div className="builder">
          <Toolbar />
          <Canvas isPreviewMode={isPreviewMode} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
