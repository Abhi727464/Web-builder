import React from "react";
import DraggableComponent from "./DraggableComponent";

function Toolbar({ isPreviewMode }) {
  return (
    <div className="toolbar">
      <h2>Components</h2>
      {!isPreviewMode && (
        <>
          <DraggableComponent type="text" label="Text Box" />
          <DraggableComponent type="image" label="Image" />
          <DraggableComponent type="button" label="Button" />
        </>
      )}
    </div>
  );
}

export default Toolbar;
