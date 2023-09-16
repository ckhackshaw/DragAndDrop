import { ReactNode } from "react";

interface DraggleItemProps {
  children: ReactNode;
  itemRef: (instance: HTMLLIElement) => void;
  index: number;
  onDragStart: () => void;
}
const DraggableItem = ({
  children,
  itemRef,
  onDragStart,
}: DraggleItemProps) => {
  const startDrag = (e: React.DragEvent) => {
    const mouseStart = { x: e.clientX, y: e.clientY };
    onDragStart();
    console.log("Item: Starting Drag", mouseStart);
  };
  const isDragging = (e: React.DragEvent) => {
    e.clientX;
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
