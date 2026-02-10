import React, { useState } from 'react';
import TaskForm from './TaskForm';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-between p-4 bg-indigo-600 text-white">
      <h1 className="text-xl font-semibold">Kanban Board</h1>
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="bg-white text-indigo-600 px-3 py-1 rounded">New Task</button>
      </div>
      {open && <TaskForm onClose={() => setOpen(false)} />}
    </header>
  );
}
