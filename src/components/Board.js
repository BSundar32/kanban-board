import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { useTasks } from '../context/TaskContext';

export default function Board() {
  const { columns, moveTask } = useTasks();

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    moveTask(source.droppableId, destination.droppableId, source.index, destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-3">
        <Column id="todo" title="To Do" tasks={columns.todo} />
        <Column id="inprogress" title="In Progress" tasks={columns.inprogress} />
        <Column id="done" title="Done" tasks={columns.done} />
      </div>
    </DragDropContext>
  );
}
