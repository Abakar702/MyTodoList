import React from 'react';
import { TrendingUp, Target, CheckCircle, Clock } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoStats = () => {
  const { todos, stats } = useTodo();

  if (todos.length === 0) return null;

  const cards = [
    {
      label: 'Objectifs',
      value: stats.total,
      icon: <Target className="h-6 w-6" />,
      gradient: 'from-blue-600 to-indigo-600',
      shadow: 'shadow-blue-200 dark:shadow-none'
    },
    {
      label: 'En attente',
      value: stats.active,
      icon: <Clock className="h-6 w-6" />,
      gradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-200 dark:shadow-none'
    },
    {
      label: 'Succès',
      value: stats.completed,
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: 'from-emerald-500 to-green-600',
      shadow: 'shadow-emerald-200 dark:shadow-none'
    },
    {
      label: 'Boost',
      value: `${stats.completionRate}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: 'from-accent-500 to-pink-600',
      shadow: 'shadow-pink-200 dark:shadow-none'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-reveal">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden bg-white dark:bg-surface-800 rounded-3xl p-6 border border-gray-100 dark:border-surface-700 shadow-premium hover:shadow-premium-hover transition-all duration-500 hover:-translate-y-1`}
        >
          <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500">
            {card.icon}
          </div>

          <div className="relative z-10">
            <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg mb-4`}>
              {card.icon}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">{card.label}</p>
            <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white mt-1">{card.value}</h3>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-500"></div>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;