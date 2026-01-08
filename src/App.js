import React from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoStats from './components/TodoStats';
import TodoList from './components/TodoList';
import TodoSearch from './components/TodoSearch';
import Toast from './components/Toast';
import { TodoProvider, useTodo } from './context/TodoContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const TodoAppContent = () => {
  const { todos, clearCompleted } = useTodo();
  const activeCount = todos.filter(t => !t.completed).length;
  const hasCompleted = todos.some(t => t.completed);

  return (
    <div className="min-h-screen mesh-gradient relative pb-20 overflow-x-hidden">
      <Toast />
      {/* Decorative background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TodoStats />

          <div className="relative">
            <TodoForm />

            <div className="sticky top-4 z-40 bg-white/40 dark:bg-surface-950/40 backdrop-blur-md rounded-3xl p-4 border border-white/20 dark:border-white/5 shadow-2xl mb-12 animate-reveal" style={{ animationDelay: '200ms' }}>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <TodoSearch />
                </div>
                <div className="w-full md:w-auto">
                  <TodoFilter />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8 px-2 animate-reveal" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white tracking-tight">
                  Missions
                </h2>
                <div className="px-4 py-1.5 bg-primary-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-primary-200 dark:shadow-none">
                  {activeCount} active{activeCount > 1 ? 's' : ''}
                </div>
              </div>

              {hasCompleted && (
                <button
                  onClick={clearCompleted}
                  className="group flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors duration-300"
                >
                  <span className="w-8 h-[1px] bg-gray-200 group-hover:bg-rose-200 transition-colors"></span>
                  <span>Nettoyer l'espace</span>
                </button>
              )}
            </div>

            <TodoList />
          </div>
        </main>

        <footer className="max-w-4xl mx-auto px-4 mt-20 pb-12 text-center animate-reveal" style={{ animationDelay: '500ms' }}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-surface-700 to-transparent mb-10"></div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Cloud Engine v2.4
              </span>
              <span className="hidden sm:inline w-1 h-1 bg-gray-300 dark:bg-surface-700 rounded-full"></span>
              <span className="text-gray-900 dark:text-white opacity-40">Encrypted Session</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full items-center gap-4 text-gray-500 dark:text-gray-400 text-[11px] font-medium">
              <p>© {new Date().getFullYear()} <span className="text-gray-900 dark:text-white font-bold">Zenith Master</span>. Digital Excellence.</p>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-gray-200 dark:bg-surface-800"></span>
                <p>Architecturé par <span className="text-primary-600 dark:text-primary-400 font-bold">Abakar Dev</span></p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TodoProvider>
          <TodoAppContent />
        </TodoProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;