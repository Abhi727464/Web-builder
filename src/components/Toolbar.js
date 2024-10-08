import React from "react";
import DraggableComponent from "./DraggableComponent";

function Toolbar({ isPreviewMode }) {
  return (
    <div className={`toolbar ${isPreviewMode ? "toolbar-hidden" : ""}`}>
      <h2>Draggable Components</h2>
      <DraggableComponent
        type="text"
        label="Text Box"
        isPreviewMode={isPreviewMode}
      />
      <DraggableComponent
        type="image"
        label="Image"
        isPreviewMode={isPreviewMode}
      />
      <DraggableComponent
        type="button"
        label="Button"
        isPreviewMode={isPreviewMode}
      />
    </div>
  );
}

export default Toolbar;
