import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardCheck, Stars } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoList = () => {
  const { filteredTodos, filter } = useTodo();

  if (filteredTodos.length === 0) {
    return (
      <div className="card-glass text-center py-20 animate-reveal">
        {filter === 'completed' ? (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"></div>
              <ClipboardCheck className="relative h-20 w-20 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-display font-black text-gray-800 dark:text-white mb-2">Espace Vierge</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto font-medium">
              Vous n'avez pas encore de missions accomplies. Relevez le défi !
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary-500/20 blur-2xl rounded-full"></div>
              <Stars className="relative h-20 w-20 text-primary-500 animate-float" />
            </div>
            <h3 className="text-2xl font-display font-black text-gray-800 dark:text-white mb-2">
              {filter === 'all' ? 'Prêt pour l\'aventure ?' : 'Aucun résultat'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto font-medium">
              {filter === 'all'
                ? 'Votre tableau de bord est prêt. Ajoutez votre première mission pour commencer.'
                : 'Ajustez vos filtres pour découvrir de nouvelles opportunités.'}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 animate-reveal">
      {filteredTodos.map((todo, index) => (
        <div key={todo.id} className="animate-reveal" style={{ animationDelay: `${index * 50}ms` }}>
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;