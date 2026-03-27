import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  reorderTodos,
  validateTodo
} from '../controllers/todoController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getTodos);
router.post('/', validateTodo, createTodo);
router.put('/:id', validateTodo, updateTodo);
router.delete('/:id', deleteTodo);
router.put('/reorder', reorderTodos);

export default router;
