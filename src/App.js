import { useState } from "react";
import "./App.css";
import initialData from "./tasks";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [state, setState] = useState(initialData);
  const { tasks, columns } = state;

  const column = columns["column-1"];
  const taskList = column.taskIds.map((taskId) => tasks[taskId]);
  const onDragEnd = () => {};
  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Column key={column.id} tasks={taskList} column={column} />
      </DragDropContext>
    </div>
  );
}

export default App;
