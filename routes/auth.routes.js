import { Router } from 'express';
import { signIn, signUp, signOut } from '../controllers/auth.controller.js';

const authRouter = Router();

// Route to handle user sign-up
authRouter.post('/sign-up', signUp);

// Route to handle user sign-in
authRouter.post('/sign-in', signIn);

// Route to handle user sign-out
authRouter.post('/sign-out', signOut);

export default authRouter;
