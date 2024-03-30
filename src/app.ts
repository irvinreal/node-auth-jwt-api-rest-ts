import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/userRoutes'
dotenv.config();

const app = express();

app.use(express.json());

// Routes
// ..Authentication
app.use('/auth', authRoutes);
// ..User
app.use('/users', usersRoutes);

export default app;
