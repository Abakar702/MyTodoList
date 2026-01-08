import React from 'react';
import { ListTodo, CheckCircle, Clock, Zap } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoFilter = () => {
  const { filter, setFilter } = useTodo();

  const filters = [
    { id: 'all', label: 'Tout', icon: <ListTodo className="h-4 w-4" /> },
    { id: 'active', label: 'En cours', icon: <Clock className="h-4 w-4" /> },
    { id: 'completed', label: 'Fini', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'high', label: 'Urgent', icon: <Zap className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8 animate-reveal">
      <div className="mr-2 text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:block">Filtrer par :</div>
      <div className="flex bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-500 font-bold text-sm ${filter === f.id
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
              : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
          >
            <span className={filter === f.id ? 'animate-pulse' : ''}>{f.icon}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;