import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from './TaskForm';

export default function TaskModal({ task, onClose }) {
  const { deleteTask } = useTasks();
  const [editing, setEditing] = useState(false);

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        {!editing && (
          <>
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="mt-3">{task.description}</p>
            <p className="mt-3 text-sm text-gray-600">Priority: {task.priority}</p>
            <p className="mt-2 text-sm text-gray-600">Status: {task.status || 'todo'}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-1 border rounded" onClick={() => { deleteTask(task.id); onClose(); }}>Delete</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => setEditing(true)}>Edit</button>
              <button className="px-3 py-1 border rounded" onClick={onClose}>Close</button>
            </div>
          </>
        )}
        {editing && (
          <div className="space-y-3">
            <TaskForm existing={task} onClose={() => setEditing(false)} inline={true} />
          </div>
        )}
      </div>
    </div>
  );
}
