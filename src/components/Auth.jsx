import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, UserPlus, LogIn, Loader2, X, Eye, EyeOff } from 'lucide-react';

const Auth = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, signup } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            onClose();
        } catch (err) {
            console.error("Firebase Auth Error:", err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Cet email est déjà utilisé.');
            } else if (err.code === 'auth/weak-password') {
                setError('Le mot de passe doit contenir au moins 6 caractères.');
            } else if (err.code === 'auth/invalid-credential') {
                setError('Email ou mot de passe incorrect.');
            } else if (err.code === 'auth/operation-not-allowed') {
                setError('La connexion par email/mot de passe n\'est pas activée dans Firebase.');
            } else {
                setError('Erreur : ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-white dark:bg-surface-900 rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5">
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-8 pt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-2">
                            {isLogin ? 'Bon retour !' : 'Rejoignez-nous'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {isLogin ? 'Connectez-vous pour synchroniser vos tâches' : 'Créez un compte pour ne plus jamais perdre vos missions'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nom@exemple.com"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-surface-800 border-2 border-transparent focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Mot de passe</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-surface-800 border-2 border-transparent focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl outline-none transition-all dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 focus:outline-none transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/20 transition-all flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>{isLogin ? 'Se connecter' : 'Créer un compte'}</span>
                                    {isLogin ? <LogIn size={18} className="group-hover:translate-x-1 transition-transform" /> : <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                        >
                            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
