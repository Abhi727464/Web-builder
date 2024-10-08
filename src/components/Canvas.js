import React, { useCallback, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import ButtonComponent from "./ButtonComponent";
import ImageComponent from "./ImageComponent";
import TextEditor from "./TextEditor";

export const ItemTypes = {
  TEXT: "text",
  IMAGE: "image",
  BUTTON: "button",
};

export function getDraggingStyles(left, top, isDragging, isOutLine, isPreview) {
  if (isPreview) {
    return {
      position: "absolute",
      left,
      top,
      outline: "none",
    };
  }
  return {
    position: "absolute",
    left,
    top,
    opacity: isDragging ? 0 : 1,
    cursor: "move",
    outline: isOutLine ? "" : "none",
  };
}

const Canvas = ({ isPreviewMode }) => {
  const canvasRef = useRef(null);
  const [components, setComponents] = useState([]);

  const moveBox = useCallback(
    (id, left, top) => {
      const canvas = canvasRef.current?.getBoundingClientRect();
      if (canvas) {
        const component = components.find((comp) => comp.id === id);
        const elementWidth = component?.width || 0;
        const elementHeight = component?.height || 0;

        left = Math.max(0, Math.min(left, canvas.width - elementWidth));
        top = Math.max(0, Math.min(top, canvas.height - elementHeight));
      }

      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.id === id ? { ...component, left, top } : component
        )
      );
    },
    [components]
  );

  const addComponent = useCallback((type, left, top) => {
    const canvas = canvasRef.current?.getBoundingClientRect();
    if (canvas) {
      const elementWidth = 340; // Default width for text and image components
      const elementHeight = 50; // Default height

      left = Math.max(0, Math.min(left, canvas.width - elementWidth));
      top = Math.max(0, Math.min(top, canvas.height - elementHeight));
    }

    const id = `${type}-${Date.now()}`; // Unique ID
    setComponents((prevComponents) => [
      ...prevComponents,
      { type, left, top, id, width: 340, height: 50 }, // Default width and height
    ]);
  }, []);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BUTTON, ItemTypes.TEXT, ItemTypes.IMAGE],
      drop: (item, monitor) => {
        const currentClientOffset = monitor.getClientOffset();
        const canvas = canvasRef.current?.getBoundingClientRect();

        if (currentClientOffset && canvas) {
          let left = currentClientOffset.x - canvas.left; // Calculate drop position within the canvas
          let top = currentClientOffset.y - canvas.top;

          const elementWidth = item.width || 0;
          const elementHeight = item.height || 0;

          // Adjust for the element's width and height
          left -= elementWidth / 2;
          top -= elementHeight / 2;

          left = Math.max(0, Math.min(left, canvas.width - elementWidth));
          top = Math.max(0, Math.min(top, canvas.height - elementHeight));

          if (!item?.id) {
            addComponent(item.type, left, top);
          } else {
            moveBox(item.id, left, top);
          }
        }
      },
    }),
    [moveBox, addComponent]
  );

  const onRemoveComponent = (id) => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this component?"
    );
    if (confirmRemoval) {
      setComponents((prevComponents) =>
        prevComponents.filter((comp) => comp.id !== id)
      );
    }
  };

  const canvasRefCallback = useCallback(
    (node) => {
      if (node) {
        drop(node);
        canvasRef.current = node;
      }
    },
    [drop]
  );

  return (
    <div
      ref={!isPreviewMode ? canvasRefCallback : null}
      className="canvas"
      style={{
        border: "1px solid gray",
        backgroundColor: isPreviewMode ? "white" : "transparent",
      }}
    >
      {components.map((component) => {
        switch (component.type) {
          case ItemTypes.TEXT:
            return (
              <TextEditor
                key={component.id}
                {...component}
                isPreviewMode={isPreviewMode}
                onRemove={onRemoveComponent}
              />
            );
          case ItemTypes.IMAGE:
            return (
              <ImageComponent
                key={component.id}
                {...component}
                isPreviewMode={isPreviewMode}
                onRemove={onRemoveComponent}
              />
            );
          case ItemTypes.BUTTON:
            return (
              <ButtonComponent
                key={component.id}
                {...component}
                isPreviewMode={isPreviewMode}
                onRemove={onRemoveComponent}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Canvas;
