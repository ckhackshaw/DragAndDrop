export interface SimpleObjectProps {
  name: string;
}

export interface DroppableContainerProp<T> {
  data: Array<T>;
  onDropAction: () => void;
}

export interface ItemPosition {}
