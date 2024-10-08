import React, { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ButtonComponent = ({ isPreviewMode, removeComponent, id }) => {
  const [buttonText, setButtonText] = useState("button");
  const [isButtonTextEditable, setIsButtonTextEditable] = useState(false);
  const inputRef = useRef(null);

  const onChangeButtonText = () => {
    setIsButtonTextEditable(true);
  };

  useEffect(() => {
    if (!isPreviewMode) {
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          setIsButtonTextEditable(false); // Disable editing mode if click occurs outside input
          if (buttonText === "") {
            setButtonText("Click Me");
          }
        }
      };

      if (isButtonTextEditable) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isButtonTextEditable, isPreviewMode, buttonText]);

  return (
    <div>
      {isPreviewMode ? (
        <>
          <button onClick={() => toast.success("button clicked")}>
            {buttonText}
          </button>
        </>
      ) : isButtonTextEditable ? (
        <input
          className="input-btn"
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          ref={inputRef}
          onBlur={() => setIsButtonTextEditable(false)} // Close the input after editing.
          autoFocus // Automatically focuses the input when editable.
        />
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <span className="remove-icon" onClick={() => removeComponent(id)}>
              X
            </span>
            <button onDoubleClick={onChangeButtonText}>{buttonText}</button>
          </div>
        </>
        // Double click to make text editable.
      )}
    </div>
  );
};

export default ButtonComponent;
