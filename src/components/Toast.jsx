import React from 'react';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const Toast = () => {
    const { notification } = useTodo();

    if (!notification) return null;

    const { message, type } = notification;

    const styles = {
        success: 'bg-emerald-500 text-white shadow-emerald-200',
        info: 'bg-primary-500 text-white shadow-primary-200',
        error: 'bg-rose-500 text-white shadow-rose-200',
    };

    const icons = {
        success: <CheckCircle className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />,
        error: <AlertCircle className="h-5 w-5" />,
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-reveal">
            <div className={`${styles[type] || styles.info} px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-2xl`}>
                <span className="flex-shrink-0">{icons[type] || icons.info}</span>
                <span className="font-bold text-sm tracking-tight">{message}</span>
            </div>
        </div>
    );
};

export default Toast;
