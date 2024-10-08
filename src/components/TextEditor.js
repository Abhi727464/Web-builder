import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { getComponentStyle } from "./helper/Helper";

const TextEditor = ({
  id,
  type,
  left,
  top,
  isPreviewMode,
  deleteComponent,
}) => {
  const [text, setText] = useState("Enter the content input");

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { id, left, top, type, width: 340, height: 50 }, // Added width and height here
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, type]
  );

  return (
    <div
      className="text-container"
      style={{
        ...getComponentStyle(left, top, isDragging, true, isPreviewMode),
        pointerEvents: isPreviewMode ? "none" : "auto", // Set pointerEvents correctly
      }}
      ref={!isPreviewMode ? drag : null}
    >
      {!isPreviewMode && (
        <div style={{ position: "relative" }}>
          <span onClick={() => deleteComponent(id)} className="remove-icon">
            x
          </span>
        </div>
      )}
      <input
        placeholder="Please Enter Input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        style={{
          cursor: isPreviewMode ? "default" : "move", // Use "default" in preview mode
        }}
        className="text-editor"
      />
    </div>
  );
};

export default TextEditor;
