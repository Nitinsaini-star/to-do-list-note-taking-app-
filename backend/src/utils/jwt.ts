import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    username: user.username
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
};
