import React from "react";
import { useDrag } from "react-dnd";
import TextEditor from "./TextEditor";
import ButtonComponent from "./ButtonComponent";
import ImageComponent from "./ImageComponent";

function DraggableComponentCanvas({
  component,
  isPreviewMode,
  removeComponent,
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: component.type,
    item: { ...component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="component"
      style={{
        left: component.left,
        top: component.top,
        position: "absolute",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {component.type === "text" && (
        <TextEditor isPreviewMode={isPreviewMode} type={component.type} />
      )}
      {component.type === "image" && <ImageComponent />}
      {component.type === "button" && (
        <ButtonComponent
          id={component.id}
          isPreviewMode={isPreviewMode}
          removeComponent={removeComponent}
          component={component}
        />
      )}
    </div>
  );
}

export default DraggableComponentCanvas;
