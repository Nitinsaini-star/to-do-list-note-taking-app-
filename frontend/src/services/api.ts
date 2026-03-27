import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  ApiResponse, 
  TodosResponse, 
  LoginCredentials, 
  RegisterCredentials, 
  Todo, 
  CreateTodoData, 
  UpdateTodoData,
  FilterOptions
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  }

  async getTodos(filters?: FilterOptions): Promise<TodosResponse> {
    const params = new URLSearchParams();
    if (filters?.completed !== undefined) {
      params.append('completed', filters.completed.toString());
    }
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    const response = await this.api.get<TodosResponse>(`/todos?${params}`);
    return response.data;
  }

  async createTodo(todoData: CreateTodoData): Promise<ApiResponse<Todo>> {
    const response = await this.api.post<ApiResponse<Todo>>('/todos', todoData);
    return response.data;
  }

  async updateTodo(id: string, todoData: UpdateTodoData): Promise<ApiResponse<Todo>> {
    const response = await this.api.put<ApiResponse<Todo>>(`/todos/${id}`, todoData);
    return response.data;
  }

  async deleteTodo(id: string): Promise<ApiResponse> {
    const response = await this.api.delete<ApiResponse>(`/todos/${id}`);
    return response.data;
  }

  async reorderTodos(todos: { id: string; order: number }[]): Promise<ApiResponse> {
    const response = await this.api.put<ApiResponse>('/todos/reorder', { todos });
    return response.data;
  }
}

export const apiService = new ApiService();
