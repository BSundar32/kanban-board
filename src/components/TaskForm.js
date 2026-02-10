import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskForm({ onClose, existing, inline = false }) {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [status, setStatus] = useState(existing?.status || 'todo');
  const [priority, setPriority] = useState(existing?.priority || 'Medium');

  function handleSubmit(e) {
    e.preventDefault();
    if (existing) {
      updateTask({ ...existing, title, description, priority, status });
    } else {
      addTask({ title, description, status, priority });
    }
    onClose && onClose();
  }

  const form = (
    <form onSubmit={handleSubmit} className={`bg-white ${inline ? 'p-0' : 'p-6'} rounded shadow w-full ${inline ? '' : 'max-w-md'} text-gray-800`}>
      <h2 className="text-lg font-semibold mb-3">{existing ? 'Edit Task' : 'New Task'}</h2>
      <label className="block mb-2">Title</label>
      <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-3 p-3 border rounded" required />
      <label className="block mb-2">Description</label>
      <textarea placeholder="Describe the task" value={description} onChange={e => setDescription(e.target.value)} className="w-full mb-3 p-3 border rounded min-h-[96px]" />

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block mb-2">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 border rounded bg-white">
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full p-2 border rounded bg-white">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <button type="button" onClick={() => onClose && onClose()} className="px-4 py-2 rounded border text-sm">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white text-sm">Save</button>
      </div>
    </form>
  );

  if (inline) return form;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
      {form}
    </div>
  );
}
