import React, { useState } from 'react';
import { CheckCircle, Moon, Sun, ShieldCheck, Download, User, LogOut } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';
import Auth from './Auth';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTodo();
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [showInstallBtn, setShowInstallBtn] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="pt-8 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/50 dark:bg-surface-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-premium">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="p-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl shadow-lg transform hover:rotate-6 transition-transform duration-300">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-accent-400">
                Zenith Master
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
                  {user ? `Session Cloud : ${user.email.split('@')[0]}` : 'Mode Invité (Stockage Local)'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showInstallBtn && (
              <button
                onClick={handleInstallClick}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-2xl font-bold text-xs hover:bg-primary-600 transition-all shadow-lg shadow-primary-200 dark:shadow-none"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Installer</span>
              </button>
            )}

            {/* Auth Button */}
            {user ? (
              <button
                onClick={logout}
                className="group flex items-center space-x-2 px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl border border-rose-100 dark:border-rose-500/20 hover:bg-rose-100 transition-all font-bold text-xs"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="group flex items-center space-x-2 px-4 py-2.5 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-2xl border border-primary-100 dark:border-primary-500/20 hover:bg-primary-100 transition-all font-bold text-xs"
              >
                <User className="h-4 w-4 text-primary-500" />
                <span className="hidden sm:inline">Se connecter</span>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="group relative p-3 bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-surface-700 hover:border-primary-500 transition-all duration-300 shadow-sm"
              aria-label={darkMode ? "Mode Clair" : "Mode Sombre"}
            >
              <div className="absolute inset-0 bg-primary-500/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              {darkMode ? (
                <Sun className="h-6 w-6 text-yellow-500 relative z-10" />
              ) : (
                <Moon className="h-6 w-6 text-primary-600 relative z-10" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};

export default Header;