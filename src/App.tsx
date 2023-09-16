import { useState } from "react";
import "./App.css";
import DroppableContainer from "./Components/DroppableContainer";
import { SimpleObjectProps } from "./types/index";

const App = () => {
  const reArrangeNamesList = () => {
    console.log("Rearrage names list now");
    setNamesList((prev) => prev);
  };
  const [namesList, setNamesList] = useState<SimpleObjectProps[]>([
    {
      name: "A",
    },
    {
      name: "B",
    },
    {
      name: "C",
    },
    {
      name: "D",
    },
    {
      name: "E",
    },
  ]);
  return (
    <div className="App">
      <DroppableContainer data={namesList} onDropAction={reArrangeNamesList} />
    </div>
  );
};

export default App;
