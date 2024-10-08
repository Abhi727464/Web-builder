import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import ButtonComponent from "./ButtonComponent";
import ImageComponent from "./ImageComponent";
import TextEditor from "./TextEditor";
import { ComponentTypes } from "./helper/Helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Canvas = ({ isPreviewMode }) => {
  const canvasRef = useRef(null);
  const [components, setComponents] = useState([]);
  const isPreviewModeRef = useRef(isPreviewMode);

  // Adjusts the position of components within canvas bounds
  const adjustPosition = (left, top, width, height) => {
    const canvas = canvasRef.current?.getBoundingClientRect();
    if (!canvas) return { left, top };

    left = Math.max(0, Math.min(left, canvas.width - width));
    top = Math.max(0, Math.min(top, canvas.height - height));
    return { left, top };
  };

  // Moves a component
  const moveBox = useCallback(
    (id, left, top) => {
      const component = components.find((comp) => comp.id === id);
      if (component) {
        const { left: newLeft, top: newTop } = adjustPosition(
          left,
          top,
          component.width,
          component.height
        );

        setComponents((prevComponents) =>
          prevComponents.map((component) =>
            component.id === id
              ? { ...component, left: newLeft, top: newTop }
              : component
          )
        );
      }
    },
    [components]
  );

  // Updates the preview mode reference
  useEffect(() => {
    isPreviewModeRef.current = isPreviewMode;
  }, [isPreviewMode]);

  // Adds a new component to the canvas
  const addComponent = useCallback((type, left, top) => {
    const { left: newLeft, top: newTop } = adjustPosition(left, top, 340, 50);
    const id = `${type}-${Date.now()}`;

    setComponents((prevComponents) => [
      ...prevComponents,
      { type, left: newLeft, top: newTop, id, width: 340, height: 50 },
    ]);
  }, []);

  // Drop handler for components
  const [, drop] = useDrop(
    () => ({
      accept: [
        ComponentTypes.BUTTON,
        ComponentTypes.TEXT,
        ComponentTypes.IMAGE,
      ],
      drop: (item, monitor) => {
        if (isPreviewModeRef.current) {
          toast.error("Dragging is not allowed in preview mode.");
          return;
        }
        const currentClientOffset = monitor.getClientOffset();
        const canvas = canvasRef.current?.getBoundingClientRect();

        if (currentClientOffset && canvas) {
          let left = currentClientOffset.x - canvas.left;
          let top = currentClientOffset.y - canvas.top;

          const elementWidth = item.width || 340;
          const elementHeight = item.height || 50;

          left -= elementWidth / 2;
          top -= elementHeight / 2;

          const { left: newLeft, top: newTop } = adjustPosition(
            left,
            top,
            elementWidth,
            elementHeight
          );

          item.id
            ? moveBox(item.id, newLeft, newTop)
            : addComponent(item.type, newLeft, newTop);
        }
      },
    }),
    [moveBox, addComponent]
  );

  // Deletes a component
  const deleteComponent = (id) => {
    if (window.confirm("Are you sure you want to remove this component?")) {
      setComponents((prevComponents) =>
        prevComponents.filter((comp) => comp.id !== id)
      );
    }
  };

  // Ref callback for the drop target
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
        backgroundColor: isPreviewMode ? "white" : "transparent",
      }}
    >
      {components.map((component) => {
        const ComponentMap = {
          [ComponentTypes.TEXT]: TextEditor,
          [ComponentTypes.IMAGE]: ImageComponent,
          [ComponentTypes.BUTTON]: ButtonComponent,
        };

        const Component = ComponentMap[component.type];
        return Component ? (
          <Component
            key={component.id}
            {...component}
            isPreviewMode={isPreviewMode}
            deleteComponent={deleteComponent}
          />
        ) : null;
      })}
      <ToastContainer />
    </div>
  );
};

export default Canvas;
