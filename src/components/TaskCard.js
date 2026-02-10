import React, { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';

export default function TaskCard({ task, index }) {
  const [open, setOpen] = useState(false);
  const startRef = useRef(null);

  function handleMouseDown(e) {
    startRef.current = { x: e.clientX, y: e.clientY };
  }

  function handleMouseUp(e) {
    const start = startRef.current;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    // treat as click if movement less than 6 pixels
    if (distance < 6) setOpen(true);
    startRef.current = null;
  }

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white p-3 rounded shadow mb-3 cursor-grab select-none ${snapshot.isDragging ? 'opacity-90' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{task.title}</h3>
              <span className="text-xs text-gray-500">{task.priority}</span>
            </div>
            {task.tags?.length > 0 && (
              <div className="mt-2 flex gap-2">
                {task.tags.map((t, i) => <span key={i} className="text-xs bg-gray-200 px-2 py-0.5 rounded">{t}</span>)}
              </div>
            )}
          </div>
        )}
      </Draggable>
      {open && <TaskModal task={task} onClose={() => setOpen(false)} />}
    </>
  );
}
