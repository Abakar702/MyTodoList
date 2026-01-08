import React, { useState } from 'react';
import { PlusCircle, Calendar, Tag, AlertCircle, Sparkles } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoForm = () => {
  const { addTodo } = useTodo();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('moyenne');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    addTodo({
      text: text.trim(),
      completed: false,
      priority,
      category: category || null,
      dueDate: dueDate || null,
    });

    setText('');
    setCategory('');
    setDueDate('');
    setPriority('moyenne');
  };

  const categories = ['Travail', 'Personnel', 'Courses', 'Santé', 'Loisirs', 'Éducation'];

  return (
    <div className="card-glass mb-12 animate-reveal">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
          <Sparkles className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white tracking-tight">Nouvelle Mission</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label htmlFor="todoText" className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest ml-1">
            Détails de la tâche
          </label>
          <input
            id="todoText"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Qu'allons-nous accomplir aujourd'hui ?"
            className="input-premium text-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center ml-1">
              <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-primary-500" />
              Priorité
            </label>
            <div className="flex p-1.5 bg-gray-50 dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-surface-700">
              {['basse', 'moyenne', 'haute'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-tighter transition-all duration-300 ${priority === p
                    ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center ml-1">
              <Tag className="h-3.5 w-3.5 mr-1.5 text-accent-500" />
              Catégorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-premium !py-2.5 !text-sm"
            >
              <option value="">Général</option>
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center ml-1">
              <Calendar className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
              Echéance
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-premium !py-2.5 !text-sm"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-gradient w-full flex items-center justify-center space-x-2 group"
        >
          <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Ajouter au Kanban</span>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;