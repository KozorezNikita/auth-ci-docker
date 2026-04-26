import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);


app.use('/users', userRoutes)
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes)


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});



