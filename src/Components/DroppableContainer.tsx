import React, { useRef } from "react";
import DraggleItem from "./DraggableItem";
import { SimpleObjectProps, DroppableContainerProp } from "../types/index";

const DroppableContainer = ({
  data,
}: DroppableContainerProp<SimpleObjectProps>) => {
  const refContainer: React.MutableRefObject<null | Map<
    number,
    HTMLLIElement
  >> = useRef<null | Map<number, HTMLLIElement>>(null);

  const getDragabbleItemsMap = () => {
    if (!refContainer.current) {
      refContainer.current = new Map<number, HTMLLIElement>();
    }
    return refContainer.current;
  };

  const dragStyle = "dragging";

  // let itemPositions = [];
  // let mousePositionDelta = {};
  const getItemPositions = () => {
    // const itemPositions = refContainer.map((r) => {
    //   console.log(r.current.getBoundingClientRect());
    //   return r.current.getBoundingClientRect();
    // });
    // console.log("Getting item positions", itemPositions);
  };

  //remove the styles added to the dragged item
  const onDropEvent = (e: React.DragEvent) => {
    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const draggedItem = getDragabbleItemsMap().get(Number(dragData.index));
    draggedItem?.classList.remove(dragStyle);
    console.log("Container: Dropping", draggedItem);
  };

  //
  const onDragOverEvent = (e: React.DragEvent) => {
    // console.log("Container: Drag Over");
    e.preventDefault();
  };

  const onDragEndEvent = (e: React.DragEvent) => {
    const mouseEnd = { x: e.clientX, y: e.clientY };
    console.log("Container: Ending Drag", mouseEnd);
  };
  return (
    <ul
      onDrop={onDropEvent}
      onDragOver={onDragOverEvent}
      onDragEnd={onDragEndEvent}
    >
      {data.map((item: SimpleObjectProps, i: number) => (
        <DraggleItem
          itemRef={(node: HTMLLIElement): void => {
            const map = getDragabbleItemsMap();
            if (node) {
              map.set(i, node);
            } else {
              map.delete(i);
            }
          }}
          index={i}
          key={i}
          onDragStart={getItemPositions}
          onDragStyle={dragStyle}
        >
          {item.name}
        </DraggleItem>
      ))}
    </ul>
  );
};

export default DroppableContainer;
