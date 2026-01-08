import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { db } from '../firebase/config';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    orderBy,
    writeBatch
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo doit être utilisé à l\'intérieur d\'un TodoProvider');
    }
    return context;
};

export const TodoProvider = ({ children }) => {
    const { user } = useAuth();

    // --- État ---
    const [localTodos, setLocalTodos] = useLocalStorage('todos', []);
    const [dbTodos, setDbTodos] = useState([]);
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);

    // Déterminer quels todos utiliser (DB si connecté, sinon Local)
    const todos = user ? dbTodos : localTodos;

    const showToast = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // --- Sync with Firebase ---
    useEffect(() => {
        if (!user) {
            setDbTodos([]);
            return;
        }

        const q = query(
            collection(db, 'todos'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const todosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setDbTodos(todosData);
        }, (error) => {
            console.error("Firestore error:", error);
            showToast("Erreur de synchronisation Cloud", "error");
        });

        return () => unsubscribe();
    }, [user]);

    // --- Effets ---
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // --- Actions ---

    const addTodo = async (todo) => {
        if (user) {
            try {
                await addDoc(collection(db, 'todos'), {
                    ...todo,
                    userId: user.uid,
                    createdAt: new Date().toISOString()
                });
                showToast('Tâche sauvegardée dans le Cloud !');
            } catch (error) {
                showToast('Erreur lors de l\'ajout', 'error');
            }
        } else {
            setLocalTodos((prev) => [...prev, todo]);
            showToast('Tâche ajoutée localement !');
        }
    };

    const toggleTodo = async (id) => {
        const todoToToggle = todos.find(t => t.id === id);
        if (!todoToToggle) return;

        const newState = !todoToToggle.completed;

        if (user) {
            try {
                const todoRef = doc(db, 'todos', id);
                await updateDoc(todoRef, {
                    completed: newState,
                    completedAt: newState ? new Date().toISOString() : null
                });
                if (newState) showToast('Bravo ! Tâche terminée 🏆');
            } catch (error) {
                showToast('Erreur de mise à jour', 'error');
            }
        } else {
            setLocalTodos((prev) => prev.map((todo) => {
                if (todo.id === id) {
                    if (newState) showToast('Bravo ! Tâche terminée 🏆');
                    return {
                        ...todo,
                        completed: newState,
                        completedAt: newState ? new Date().toISOString() : null,
                    };
                }
                return todo;
            }));
        }
    };

    const deleteTodo = async (id) => {
        if (user) {
            try {
                await deleteDoc(doc(db, 'todos', id));
                showToast('Tâche supprimée du Cloud', 'info');
            } catch (error) {
                showToast('Erreur de suppression', 'error');
            }
        } else {
            setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
            showToast('Tâche supprimée', 'info');
        }
    };

    const editTodo = async (id, newText) => {
        if (user) {
            try {
                await updateDoc(doc(db, 'todos', id), { text: newText });
            } catch (error) {
                showToast('Erreur de modification', 'error');
            }
        } else {
            setLocalTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, text: newText } : todo
                )
            );
        }
    };

    const clearCompleted = async () => {
        if (user) {
            const completedTodos = dbTodos.filter(t => t.completed);
            const batch = writeBatch(db);
            completedTodos.forEach(t => {
                batch.delete(doc(db, 'todos', t.id));
            });
            await batch.commit();
            showToast('Espace nettoyé dans le Cloud');
        } else {
            setLocalTodos((prev) => prev.filter((todo) => !todo.completed));
            showToast('Espace nettoyé localement');
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // --- Logique de filtrage et recherche ---

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            const matchesFilter =
                filter === 'all'
                    ? true
                    : filter === 'active'
                        ? !todo.completed
                        : filter === 'completed'
                            ? todo.completed
                            : filter === 'high'
                                ? todo.priority === 'haute'
                                : true;

            const matchesSearch = todo.text?.toLowerCase().includes(searchQuery.toLowerCase()) || false;

            return matchesFilter && matchesSearch;
        });
    }, [todos, filter, searchQuery]);

    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        const active = total - completed;
        const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

        return { total, completed, active, completionRate };
    }, [todos]);

    const value = {
        todos,
        filteredTodos,
        stats,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        darkMode,
        toggleDarkMode,
        notification,
        showToast,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
