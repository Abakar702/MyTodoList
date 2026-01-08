import React, { useState } from 'react';
import { Check, Trash2, Edit2, Star, Calendar, Tag, X } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import Modal from './Modal';

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    if (isEditing && editedText.trim() !== '') {
      editTodo(todo.id, editedText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditedText(todo.text);
      setIsEditing(false);
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'haute': return { color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-100 dark:border-rose-500/20', label: 'Urgent' };
      case 'moyenne': return { color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', label: 'Normal' };
      case 'basse': return { color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20', label: 'Relax' };
      default: return { color: 'text-gray-500 bg-gray-50 dark:bg-gray-500/10', border: 'border-gray-100 dark:border-gray-500/20', label: 'Standard' };
    }
  };

  const priorityInfo = getPriorityInfo(todo.priority);

  return (
    <>
      <div className={`group relative bg-white dark:bg-surface-800 rounded-3xl p-6 border border-gray-100 dark:border-surface-700 shadow-premium transition-all duration-500 hover:shadow-premium-hover ${todo.completed ? 'opacity-60 grayscale-[0.5]' : ''}`}>
        <div className="flex items-start gap-5">
          <button
            onClick={() => toggleTodo(todo.id)}
            className={`flex-shrink-0 h-10 w-10 mt-1 rounded-2xl flex items-center justify-center transition-all duration-500 ${todo.completed
              ? 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg shadow-emerald-200 dark:shadow-none translate-y-0.5'
              : 'bg-gray-50 dark:bg-surface-700 border-2 border-gray-100 dark:border-surface-600 hover:border-primary-500 hover:scale-105 active:scale-95'
              }`}
          >
            {todo.completed && <Check className="h-6 w-6 text-white stroke-[3]" />}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="relative group">
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full bg-primary-50 dark:bg-primary-900/10 border-2 border-primary-400 rounded-2xl px-4 py-2 outline-none text-lg font-semibold"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button onClick={handleEdit} className="p-1.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    <Check className="h-4 w-4" />
                  </button>
                  <button onClick={() => { setEditedText(todo.text); setIsEditing(false); }} className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className={`text-xl font-bold tracking-tight transition-all duration-500 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                  {todo.text}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${priorityInfo.color} ${priorityInfo.border}`}>
                    <Star className="h-3 w-3 mr-1.5 fill-current" />
                    {priorityInfo.label}
                  </span>

                  {todo.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20">
                      <Tag className="h-3 w-3 mr-1.5" />
                      {todo.category}
                    </span>
                  )}

                  {todo.dueDate && (
                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                      <Calendar className="h-3 w-3 mr-1.5" />
                      {new Date(todo.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleEdit}
              className="p-3 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-2xl transition-all"
              aria-label="Editer"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
              aria-label="Supprimer"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {todo.completed && todo.completedAt && (
          <div className="mt-5 pt-4 border-t border-gray-50 dark:border-surface-700/50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-emerald-500">
            <span className="flex items-center"><Check className="h-3.5 w-3.5 mr-1.5" /> Terminé avec succès</span>
            <span className="text-gray-400 italic font-medium lowercase">le {new Date(todo.completedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteTodo(todo.id)}
        title="Supprimer la mission ?"
        message="Cette action est irréversible. La tâche sera définitivement supprimée de votre liste."
        confirmText="Supprimer"
        type="danger"
      />
    </>
  );
};

export default React.memo(TodoItem);