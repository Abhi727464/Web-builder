import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import TextEditor from "./TextEditor";
import ButtonComponent from "./ButtonComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageComponent from "./ImageComponent";

function Canvas({ isPreviewMode }) {
  const [components, setComponents] = useState([]);
  const [{ isOver }, drop] = useDrop({
    accept: ["text", "image", "button"],
    drop: (item) => {
      if (!isPreviewMode) {
        addComponent(item.type); // Only add component if not in Preview Mode
      } else {
        toast.error("Can't drop in Preview Mode");
      }
    }, // Handle drop event
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
    };
    setComponents((prev) => [...prev, newComponent]);
  };

  const removeComponent = (id) => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove this component?"
    );
    if (confirmRemoval) {
      setComponents((prevComponents) =>
        prevComponents.filter((comp) => comp.id !== id)
      );
    }
  };

  return (
    <div ref={drop} className={`canvas ${isOver ? "hover" : ""}`}>
      {components.map((component) => (
        <div key={component.id} className="component">
          {component.type === "text" && (
            <TextEditor isPreviewMode={isPreviewMode} key={component.id} />
          )}
          {component.type === "image" && <ImageComponent />}
          {component.type === "button" && (
            <ButtonComponent
              key={component.id}
              id={component.id}
              isPreviewMode={isPreviewMode}
              removeComponent={removeComponent}
              component={component}
            />
          )}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Canvas;
