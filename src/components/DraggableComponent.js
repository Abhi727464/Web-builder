import React from "react";
import { useDrag } from "react-dnd";

function DraggableComponent({ type, label, isPreviewMode }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isPreviewMode]
  );

  return (
    <div
      ref={!isPreviewMode ? drag : null} // Disable drag ref in preview mode
      className="draggable-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isPreviewMode ? "not-allowed" : "move",
      }}
    >
      {label}
    </div>
  );
}

export default DraggableComponent;
