import { ReactNode, useRef } from "react";

import { MousePosition } from "../types";

interface DraggleItemProps {
  children: ReactNode;
  itemRef: (instance: HTMLLIElement) => void;
  index: number;
  onDragStart: () => void;
  onDragStyle: string;
}
const DraggableItem = ({
  children,
  itemRef,
  index,
  onDragStart,
  onDragStyle,
}: DraggleItemProps) => {
  // store the starting mouse position, we use the delta to calculate where items should be
  const startPosition = useRef<MousePosition>();

  // empty image to remove the ghost image
  const emptyImage = document.createElement("img");
  emptyImage.src =
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  // first event to be fired when a drag event occurs, we store the original mouse coordinates & the index of the item being dragged
  const startDrag = (e: React.DragEvent) => {
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
    e.dataTransfer.effectAllowed = "move";
    const dragData = {
      index,
      mouseStartX: e.clientX,
      mouseStartY: e.clientY,
    };
    e.dataTransfer.setData("text/plain", JSON.stringify(dragData));

    startPosition.current = { x: e.clientX, y: e.clientY };
    onDragStart();

    if (e.target instanceof HTMLElement) {
      e.target.className += onDragStyle;
    }
    console.log("Item: Starting Drag");
  };

  // while item is being dragged
  const isDragging = (e: React.DragEvent) => {
    if (startPosition.current && e.target instanceof HTMLElement) {
      // get delta of mouse position
      const xDelta = e.clientX - startPosition.current.x;
      const yDelta = e.clientY - startPosition.current.y;

      // translate the element
      e.target.style.translate = `${xDelta}px ${yDelta}px`;
    }
    // console.log("Item: Dragging Now");
  };

  return (
    <li
      ref={itemRef}
      draggable="true"
      onDragStart={startDrag}
      onDrag={isDragging}
    >
      {children}
    </li>
  );
};

export default DraggableItem;
