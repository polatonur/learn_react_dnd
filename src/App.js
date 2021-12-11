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
  const onDragEnd = (result) => {
    console.log("result");
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = columns[source.droppableId];
    const newTaskIds = [...column.taskIds];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    console.log(newColumn);
    setState({
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    });
  };
  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Column key={column.id} tasks={taskList} column={column} />
      </DragDropContext>
    </div>
  );
}

export default App;
