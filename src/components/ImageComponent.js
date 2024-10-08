import React from "react";
import { useDrag } from "react-dnd";
import { ComponentTypes, getComponentStyle } from "./helper/Helper";

const ImageComponent = ({ id, left, top, isPreviewMode, deleteComponent }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ComponentTypes.IMAGE, // Updated to IMAGE type
      item: {
        id,
        type: ComponentTypes.IMAGE,
        left,
        top,
        width: 340,
        height: 50,
      }, // Added width and height
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  return (
    <div
      style={getComponentStyle(left, top, isDragging, true, isPreviewMode)}
      className="imgContainer"
      ref={isPreviewMode ? null : drag}
    >
      {!isPreviewMode && (
        <div style={{ position: "relative" }}>
          <span onClick={() => deleteComponent(id)} className="remove-icon">
            x
          </span>
        </div>
      )}
      <input
        style={{
          cursor: !isPreviewMode ? "move" : "",
          pointerEvents: isPreviewMode ? "none" : "",
        }}
        className="img-box"
        type="file"
      />
    </div>
  );
};

export default ImageComponent;
