import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

export default function Column({ id, title, tasks }) {
  return (
    <div className="flex-1 bg-gray-100 p-3 rounded">
      <h2 className="font-semibold mb-3">{title} ({tasks.length})</h2>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-[200px] p-2 ${snapshot.isDraggingOver ? 'bg-indigo-50' : ''}`}>
            {tasks.map((t, i) => <TaskCard key={t.id} task={t} index={i} />)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
