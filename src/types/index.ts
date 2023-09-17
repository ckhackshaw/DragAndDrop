export interface SimpleObjectProps {
  name: string;
}

export interface DroppableContainerProp<T> {
  data: Array<T>;
  onDropAction: () => void;
}

export interface ItemPosition {}

export interface MousePosition {
  x: number;
  y: number;
}
