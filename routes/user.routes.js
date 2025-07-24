import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { getUsers, getUser } from '../controllers/user.controller.js';

const userRouter = Router();

// Route to get all users
userRouter.get('/', getUsers);

// Route to get a specific user by ID
userRouter.get('/:id', authorize, getUser);

// Route to create a new user
userRouter.post('/', (req, res) => {
  res.send({ title: 'CREATE new user' });
});

// Route to update a user by ID
userRouter.put('/:id', (req, res) => {
  res.send({ title: 'UPDATE user' });
});

// Route to delete a user by ID
userRouter.delete('/:id', (req, res) => {
  res.send({ title: 'DELETE a user' });
});

export default userRouter;
