export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  user: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface TodosResponse extends ApiResponse<Todo[]> {
  pagination: PaginationInfo;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface UpdateTodoData extends Partial<CreateTodoData> {
  completed?: boolean;
}

export interface FilterOptions {
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  page?: number;
  limit?: number;
}
