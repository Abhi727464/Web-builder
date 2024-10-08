export const ComponentTypes = {
  TEXT: "text",
  IMAGE: "image",
  BUTTON: "button",
};

export function getComponentStyle(left, top, isDragging, isOutLine, isPreview) {
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
