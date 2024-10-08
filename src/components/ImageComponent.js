import React from "react";
import { useDrag } from "react-dnd";

// import { FaTimes } from "react-icons/fa";
import { getDraggingStyles, ItemTypes } from "./Canvas";

const ImageBox = ({ id, left, top, isPreview, onRemove }) => {
  // Set up drag functionality using react-dnd
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BUTTON, // Type of draggable item
      item: { id, type: ItemTypes.BUTTON, left, top }, // Data about the draggable item
      collect: (monitor) => ({
        isDragging: monitor.isDragging(), // Track dragging state
      }),
    }),
    [id, left, top] // Dependencies for the drag hook
  );

  return (
    <div
      style={getDraggingStyles(left, top, isDragging, true, isPreview)}
      className="w-[20%] relative"
      ref={isPreview ? null : drag}
    >
      {!isPreview && (
        <div
          onClick={() => onRemove(id)}
          // className="absolute top-[-8px] right-[-8px] p-1 bg-red-500 text-white rounded-full cursor-pointer"
        >
          {/* <FaTimes size={10} /> */}
        </div>
      )}
      <input
        style={{ cursor: !isPreview ? "move" : "" }}
        type="file"
        // className="w-full p-1 border-2 border-gray-500 bg-white"
      />
    </div>
  );
};

export default ImageBox;
