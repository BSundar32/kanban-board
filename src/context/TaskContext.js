import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

const STORAGE_KEY = 'kanban_tasks_v1';

const defaultData = {
  todo: [
    { id: 't1', title: 'Welcome!', description: 'This is a sample task. Drag me between columns.', tags: ['sample'], priority: 'Low' },
  ],
  inprogress: [],
  done: [],
};

export function TaskProvider({ children }) {
  const [columns, setColumns] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultData;
    } catch (e) {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  function addTask({ title, description, status = 'todo', tags = [], priority = 'Medium' }) {
    const id = `t_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newTask = { id, title, description, tags, priority };
    setColumns(prev => ({
      ...prev,
      [status]: [newTask, ...prev[status]],
    }));
    return id;
  }

  function updateTask(updated) {
    setColumns(prev => {
      const next = { todo: [...prev.todo], inprogress: [...prev.inprogress], done: [...prev.done] };
      // find current column for the task
      let fromCol = null;
      for (const key of Object.keys(prev)) {
        if (prev[key].some(t => t.id === updated.id)) {
          fromCol = key;
          break;
        }
      }
      const toCol = updated.status || fromCol;

      // remove from original column
      if (fromCol) {
        next[fromCol] = next[fromCol].filter(t => t.id !== updated.id);
      }

      // add/replace in destination column
      const existingIndex = next[toCol].findIndex(t => t.id === updated.id);
      const taskData = { ...updated };
      // ensure status property matches column
      if (toCol) taskData.status = toCol;

      if (existingIndex >= 0) {
        next[toCol][existingIndex] = { ...next[toCol][existingIndex], ...taskData };
      } else {
        // insert at top
        next[toCol] = [taskData, ...next[toCol]];
      }

      return next;
    });
  }

  function deleteTask(taskId) {
    setColumns(prev => {
      const next = {};
      for (const k of Object.keys(prev)) {
        next[k] = prev[k].filter(t => t.id !== taskId);
      }
      return next;
    });
  }

  function moveTask(sourceCol, destCol, sourceIndex, destIndex) {
    setColumns(prev => {
      if (!destCol) return prev;
      const sourceList = Array.from(prev[sourceCol]);
      const [moved] = sourceList.splice(sourceIndex, 1);
      const destList = Array.from(prev[destCol]);
      destList.splice(destIndex, 0, moved);
      return {
        ...prev,
        [sourceCol]: sourceList,
        [destCol]: destList,
      };
    });
  }

  return (
    <TaskContext.Provider value={{ columns, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}

export default TaskContext;
