import { Router } from 'express';
import {
  createSubscription,
  getUserSubscriptions,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
} from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const subscriptionRouter = Router();

// Route to get all subscriptions
subscriptionRouter.get('/', getAllSubscriptions);

// Route to get a specific subscription by ID
subscriptionRouter.get('/:id', authorize, getSubscriptionById);

// Route to create a new subscription
subscriptionRouter.post('/', authorize, createSubscription);

// Route to update a subscription by ID
subscriptionRouter.put('/:id', authorize, updateSubscription);

// Route to delete a subscription by ID
subscriptionRouter.delete('/:id', authorize, deleteSubscription);

// Route to get all subscriptions for a specific user
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// Route to cancel a subscription by ID
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

export default subscriptionRouter;
