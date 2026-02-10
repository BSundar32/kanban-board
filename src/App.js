import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="p-4">
          <Board />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
