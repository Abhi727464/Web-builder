import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useDrag } from "react-dnd";

function TextEditor({ isPreviewMode, id, type, left, top }) {
  const [text, setText] = useState("Enter Any input");

  //   const [{ isDragging }, drag] = useDrag(
  //     () => ({
  //       type: type, // Type of draggable item
  //       item: { id, left, top, type: type }, // Data about the draggable item
  //       collect: (monitor) => ({
  //         isDragging: monitor.isDragging(), // Track dragging state
  //       }),
  //     }),
  //     [id, left, top, type] // Dependencies for the drag hook
  //   );

  return (
    <div
    //   style={getDraggingStyles(left, top, isDragging, true, isPreview)}
    //   ref={!isPreviewMode ? drag : null}
    >
      {/* {!isPreviewMode && (
        <div onClick={() => onRemove(id)}>
          <span className="remove-icon">X</span>
        </div>
      )} */}
      <input
        placeholder="Input Box"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        className="text-editor"
        // style={{ cursor: !isPreviewMode ? "move" : "" }}
      />
    </div>
  );
}

export default TextEditor;
