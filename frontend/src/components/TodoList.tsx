import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';

interface TodoListProps {
  todos: Todo[];
  onCreateTodo: (data: any) => void;
  onUpdateTodo: (id: string, data: any) => void;
  onDeleteTodo: (id: string) => void;
  onReorderTodos: (todos: { id: string; order: number }[]) => void;
  isLoading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onReorderTodos,
  isLoading,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo._id === active.id);
      const newIndex = todos.findIndex((todo) => todo._id === over.id);

      const reorderedTodos = arrayMove(todos, oldIndex, newIndex);
      const reorderData = reorderedTodos.map((todo, index) => ({
        id: todo._id,
        order: index,
      }));

      onReorderTodos(reorderData);
    }
  };

  if (isLoading && todos.length === 0) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No todos yet</h3>
        <p className="text-gray-500 mb-6">Create your first todo to get started!</p>
        <TodoForm onSubmit={onCreateTodo} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TodoForm onSubmit={onCreateTodo} isLoading={isLoading} />
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={todos.map(todo => todo._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={onUpdateTodo}
                onDelete={onDeleteTodo}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
