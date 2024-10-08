import React from "react";
import { useDrag } from "react-dnd";

function DraggableComponent({ type, label, isPreviewMode }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { type },
      canDrag: !isPreviewMode, // Disable drag if in preview mode
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isPreviewMode] // Recalculate if preview mode changes
  );

  return (
    <div
      ref={!isPreviewMode ? drag : null} // Disable drag ref in preview mode
      className="draggable-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isPreviewMode ? "not-allowed" : "move", // Change cursor to 'not-allowed' in preview mode
      }}
    >
      {label}
    </div>
  );
}

export default DraggableComponent;
