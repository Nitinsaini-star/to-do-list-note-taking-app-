import React from 'react';
import { FilterOptions } from '../types';
import { Search, Filter, CheckCircle, Circle, Flag } from 'lucide-react';

interface TodoFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalCount: number;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filters,
  onFiltersChange,
  totalCount,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleStatusFilter = (completed: boolean | undefined) => {
    onFiltersChange({ ...filters, completed });
  };

  const handlePriorityFilter = (priority: 'low' | 'medium' | 'high' | undefined) => {
    onFiltersChange({ ...filters, priority });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.completed !== undefined || filters.priority || filters.search;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search todos..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusFilter(undefined)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.completed === undefined
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilter(false)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filters.completed === false
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <Circle className="w-3 h-3" />
              Active
            </button>
            <button
              onClick={() => handleStatusFilter(true)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filters.completed === true
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="w-3 h-3" />
              Completed
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Priority</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePriorityFilter(undefined)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.priority === undefined
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handlePriorityFilter('high')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filters.priority === 'high'
                  ? 'bg-red-100 text-red-700 border-2 border-red-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <Flag className="w-3 h-3 text-red-500" />
              High
            </button>
            <button
              onClick={() => handlePriorityFilter('medium')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filters.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <Flag className="w-3 h-3 text-yellow-500" />
              Medium
            </button>
            <button
              onClick={() => handlePriorityFilter('low')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                filters.priority === 'low'
                  ? 'bg-green-100 text-green-700 border-2 border-green-200'
                  : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <Flag className="w-3 h-3 text-green-500" />
              Low
            </button>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{totalCount}</span> todo{totalCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};
