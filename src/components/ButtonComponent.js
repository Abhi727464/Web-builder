import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { ComponentTypes, getComponentStyle } from "./helper/Helper";
import { toast } from "react-toastify";

const ButtonComponent = ({ id, left, top, isPreviewMode, deleteComponent }) => {
  const [text, setText] = useState("Click me"); // State to store button text
  const [editing, setEditing] = useState(false); // State to manage editing mode
  const inputRef = useRef(null); // Reference to the input element

  // Set up drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ComponentTypes.BUTTON, // Type of draggable item
      item: {
        id,
        type: ComponentTypes.BUTTON,
        left,
        top,
        width: 150,
        height: 40,
      }, // Data about the draggable item
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), // Track dragging state
      }),
    }),
    [id, left, top]
  );

  const handleDoubleClick = () => setEditing(true); // Enable editing mode on double-click

  useEffect(() => {
    if (isPreviewMode) {
      if (editing && inputRef.current) {
        inputRef.current.focus(); // Focus on the input if in preview mode and editing
      }
    }
  }, [editing, isPreviewMode]);
  console.log(text, "text");

  useEffect(() => {
    if (!isPreviewMode) {
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setEditing(false); // Disable editing mode if click occurs outside input
        }
        if (text.trim() === "") {
          setText("Click Me");
        }
      };

      if (editing) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [editing, isPreviewMode, text]);

  return (
    <div
      onDoubleClick={!isPreviewMode ? handleDoubleClick : () => {}}
      style={getComponentStyle(left, top, isDragging, false, isPreviewMode)}
      className="relative"
      ref={!isPreviewMode ? drag : null}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)} // Update text state on input change
          className="text-editor"
        />
      ) : (
        <>
          {!isPreviewMode && (
            <div style={{ position: "relative" }}>
              <span onClick={() => deleteComponent(id)} className="remove-icon">
                x
              </span>
            </div>
          )}
          <button
            style={{ cursor: !isPreviewMode ? "move" : "", outline: "none" }}
            onClick={
              isPreviewMode
                ? () => toast.success("Clicked on Button")
                : () => {}
            }
          >
            {text}
          </button>
        </>
      )}
    </div>
  );
};

export default ButtonComponent;
