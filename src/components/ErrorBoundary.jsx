import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-950 p-4">
                    <div className="card-glass max-w-md text-center">
                        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">⚠️</span>
                        </div>
                        <h1 className="text-3xl font-display font-black text-gray-900 dark:text-white mb-4">Oups !</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
                            Une erreur est survenue dans Zenith Master. L'application a rencontré un obstacle.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary w-full"
                        >
                            Recharger l'application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
