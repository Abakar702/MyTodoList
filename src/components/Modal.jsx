import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmer", cancelText = "Annuler", type = "danger" }) => {
    if (!isOpen) return null;

    const colors = {
        danger: "bg-rose-500 hover:bg-rose-600 shadow-rose-200",
        primary: "bg-primary-500 hover:bg-primary-600 shadow-primary-200",
        warning: "bg-amber-500 hover:bg-amber-600 shadow-amber-200"
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-sm bg-white dark:bg-surface-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/5 animate-reveal">
                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className={`p-4 rounded-2xl mb-6 ${type === 'danger' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : 'bg-primary-50 dark:bg-primary-500/10 text-primary-500'}`}>
                            <AlertTriangle size={32} />
                        </div>

                        <h3 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">
                            {title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
                            {message}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 py-4 px-6 bg-gray-50 dark:bg-surface-800 text-gray-600 dark:text-gray-400 font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-surface-700 transition-all border border-gray-100 dark:border-white/5"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 py-4 px-6 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 ${colors[type] || colors.primary}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
