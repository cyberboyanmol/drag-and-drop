import React, { useState } from "react";
import TaskData from "../../data";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import "./Todo.scss";
import Card from "../Card/Card";

const Todo = () => {
  const [data, setData] = useState(TaskData);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const souceColIndex = data.findIndex(
        (index) => index.id === source.droppableId
      );
      const destinationColIndex = data.findIndex(
        (index) => index.id === destination.droppableId
      );

      const sourceCol = data[souceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.task];
      const destinationTask = [...destinationCol.task];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
      data[souceColIndex].task = sourceTask;
      data[destinationColIndex].task = destinationTask;
      setData(data);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo">
        {data.map((item) => (
          <Droppable key={item.id} droppableId={item.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="todo__section"
              >
                <div className="todo__section__title">{item.title}</div>
                <div className="todo__section__content">
                  {item.task.map((task, index) => (
                    <Draggable
                      key={task.id}
                      index={index}
                      draggableId={task.id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.7" : "1",
                          }}
                        >
                          <Card key={task.id}>{task.task_title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Todo;
