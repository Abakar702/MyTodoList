import React from 'react';
import { Search, X } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoSearch = () => {
    const { searchQuery, setSearchQuery } = useTodo();

    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
                type="text"
                className="input-premium pl-12"
                placeholder="Rechercher une mission..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
                <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-rose-500 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default TodoSearch;
