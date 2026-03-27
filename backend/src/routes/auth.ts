import express from 'express';
import { register, login, validateRegister, validateLogin } from '../controllers/authController';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
