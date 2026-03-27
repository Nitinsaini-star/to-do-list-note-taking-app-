import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TodoList } from '../components/TodoList';
import { TodoFilters } from '../components/TodoFilters';
import { apiService } from '../services/api';
import { Todo, FilterOptions, CreateTodoData, UpdateTodoData } from '../types';
import { LogOut, CheckSquare, PlusCircle, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    highPriority: 0,
  });

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  useEffect(() => {
    calculateStats();
  }, [todos]);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getTodos(filters);
      if (response.success && response.data) {
        setTodos(response.data);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const highPriority = todos.filter(todo => todo.priority === 'high' && !todo.completed).length;

    setStats({ total, completed, active, highPriority });
  };

  const handleCreateTodo = async (data: CreateTodoData) => {
    try {
      setIsCreating(true);
      const response = await apiService.createTodo(data);
      if (response.success && response.data) {
        setTodos(prev => [response.data!, ...prev]);
        toast.success('Todo created successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create todo');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTodo = async (id: string, data: UpdateTodoData) => {
    try {
      const response = await apiService.updateTodo(id, data);
      if (response.success && response.data) {
        setTodos(prev => prev.map(todo => 
          todo._id === id ? response.data! : todo
        ));
        toast.success('Todo updated successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await apiService.deleteTodo(id);
      if (response.success) {
        setTodos(prev => prev.filter(todo => todo._id !== id));
        toast.success('Todo deleted successfully!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
    }
  };

  const handleReorderTodos = async (reorderData: { id: string; order: number }[]) => {
    try {
      const response = await apiService.reorderTodos(reorderData);
      if (response.success) {
        const reorderedTodos = reorderData
          .sort((a, b) => a.order - b.order)
          .map(item => todos.find(todo => todo._id === item.id)!)
          .filter(Boolean);
        setTodos(reorderedTodos);
      }
    } catch (error: any) {
      toast.error('Failed to reorder todos');
      fetchTodos(); // Refresh to restore correct order
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Todo App</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.username}!</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="btn btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Todos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <PlusCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TodoFilters
              filters={filters}
              onFiltersChange={setFilters}
              totalCount={todos.length}
            />
          </div>

          <div className="lg:col-span-3">
            <TodoList
              todos={todos}
              onCreateTodo={handleCreateTodo}
              onUpdateTodo={handleUpdateTodo}
              onDeleteTodo={handleDeleteTodo}
              onReorderTodos={handleReorderTodos}
              isLoading={isLoading || isCreating}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
