import React, { useState } from 'react';
import { Todo } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Flag, 
  Trash2, 
  Edit2, 
  Save, 
  X 
} from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, { 
        title: editTitle.trim(), 
        description: editDescription.trim() || undefined 
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityIcon = () => {
    switch (todo.priority) {
      case 'high': return <Flag className="w-4 h-4 text-red-500" />;
      case 'medium': return <Flag className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Flag className="w-4 h-4 text-green-500" />;
      default: return <Flag className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`todo-item ${getPriorityColor()} ${todo.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className="mt-1 flex-shrink-0 transition-colors hover:scale-110"
        >
          {todo.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-2 py-1 text-lg font-medium border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {todo.title}
                </h3>
              )}

              {isEditing ? (
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add a description..."
                  className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                />
              ) : todo.description ? (
                <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                  {todo.description}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(todo._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              {getPriorityIcon()}
              <span className="capitalize">{todo.priority}</span>
            </div>

            {todo.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
              </div>
            )}

            <div className="flex items-center gap-1 cursor-move" {...attributes} {...listeners}>
              <span className="text-gray-400">⋮⋮</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
