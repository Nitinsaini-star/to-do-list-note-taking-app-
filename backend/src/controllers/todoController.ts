import { Response } from 'express';
import { body, validationResult } from 'express-validator';
import Todo, { ITodo } from '../models/Todo';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

export const validateTodo = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
];

export const getTodos = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { page = 1, limit = 10, completed, priority, search } = req.query;
  
  const query: any = { user: req.user!._id };

  if (completed !== undefined) {
    query.completed = completed === 'true';
  }

  if (priority) {
    query.priority = priority;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const todos = await Todo.find(query)
    .sort({ order: 1, createdAt: -1 })
    .limit(Number(limit) * Number(page))
    .skip((Number(page) - 1) * Number(limit));

  const total = await Todo.countDocuments(query);

  res.json({
    success: true,
    data: todos,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit))
    }
  });
});

export const createTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, description, priority, dueDate } = req.body;

  const maxOrder = await Todo.findOne({ user: req.user!._id })
    .sort({ order: -1 })
    .select('order');

  const todo = new Todo({
    title,
    description,
    priority,
    dueDate,
    user: req.user!._id,
    order: (maxOrder?.order || 0) + 1
  });

  await todo.save();

  res.status(201).json({
    success: true,
    data: todo
  });
});

export const updateTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { id } = req.params;
  const { title, description, completed, priority, dueDate } = req.body;

  const todo = await Todo.findOne({ _id: id, user: req.user!._id });

  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  if (priority !== undefined) todo.priority = priority;
  if (dueDate !== undefined) todo.dueDate = dueDate;

  await todo.save();

  res.json({
    success: true,
    data: todo
  });
});

export const deleteTodo = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findOne({ _id: id, user: req.user!._id });

  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  await todo.deleteOne();

  res.json({
    success: true,
    message: 'Todo deleted successfully'
  });
});

export const reorderTodos = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { todos } = req.body;

  if (!Array.isArray(todos)) {
    res.status(400).json({ message: 'Todos must be an array' });
    return;
  }

  const bulkOps = todos.map((todo: { id: string; order: number }) => ({
    updateOne: {
      filter: { _id: todo.id, user: req.user!._id },
      update: { order: todo.order }
    }
  }));

  await Todo.bulkWrite(bulkOps);

  res.json({
    success: true,
    message: 'Todos reordered successfully'
  });
});
