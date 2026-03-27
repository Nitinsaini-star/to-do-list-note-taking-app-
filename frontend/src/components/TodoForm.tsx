import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Plus, Calendar, Flag } from 'lucide-react';
import { CreateTodoData } from '../types';

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(100, 'Title cannot exceed 100 characters'),
  description: yup
    .string()
    .optional()
    .max(500, 'Description cannot exceed 500 characters'),
  priority: yup
    .string()
    .optional()
    .oneOf(['low', 'medium', 'high'], 'Priority must be low, medium, or high'),
  dueDate: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Due date must be in YYYY-MM-DD format'),
});

interface TodoFormProps {
  onSubmit: (data: CreateTodoData) => void;
  isLoading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, isLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
    },
  });

  const handleFormSubmit = (data: CreateTodoData) => {
    const processedData: CreateTodoData = {
      ...data,
      description: data.description?.trim() || undefined,
      dueDate: data.dueDate || undefined,
    };
    
    onSubmit(processedData);
    reset();
    setIsExpanded(false);
  };

  const handleCancel = () => {
    reset();
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 text-left text-gray-500 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add a new todo...</span>
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 animate-slide-in">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            {...register('title')}
            className={`input ${errors.title ? 'border-red-500' : ''}`}
            autoFocus
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title?.message as string}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Add a description (optional)"
            rows={3}
            {...register('description')}
            className={`input resize-none ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description?.message as string}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Flag className="w-4 h-4" />
              Priority
            </label>
            <select
              {...register('priority')}
              className={`input ${errors.priority ? 'border-red-500' : ''}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-500">{errors.priority?.message as string}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4" />
              Due Date
            </label>
            <input
              type="date"
              {...register('dueDate')}
              className={`input ${errors.dueDate ? 'border-red-500' : ''}`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-500">{errors.dueDate?.message as string}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Todo
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
