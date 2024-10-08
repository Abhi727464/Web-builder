import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { getDraggingStyles } from "./Canvas";

const TextBox = ({ id, type, left, top, isPreview, onRemove }) => {
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
      style={getDraggingStyles(left, top, isDragging, true, isPreview)}
      ref={!isPreview ? drag : null}
    >
      {!isPreview && (
        <div onClick={() => onRemove(id)}>
          <span>x</span>
        </div>
      )}
      <input
        placeholder="placeholder"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        style={{ cursor: !isPreview ? "move" : "" }}
        className="text-editor"
      />
    </div>
  );
};

export default TextBox;
