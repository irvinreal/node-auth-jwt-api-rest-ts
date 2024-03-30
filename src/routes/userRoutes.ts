import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from '../controllers/usersController';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// Middleware de JWT para verificar si estamos autenticados
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) || '';

  if (!token) {
    res.status(401).json({ error: 'No autorizado.' });
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      console.error('Error en la autenticación.');
      return res
        .status(403)
        .json({ error: 'No tienes acceso a este recurso.' });
    }

    next();
  });
};

router.post('/', authenticateToken, createUser);
router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
