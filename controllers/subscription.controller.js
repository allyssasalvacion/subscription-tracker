import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

/**
 * Create a new subscription
 * Automatically assigns the subscription to the authenticated user
 */
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
};

/**
 * Get all subscriptions for a specific user
 * Checks if the user is authorized to access the requested user’s subscriptions
 */
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error(
        "You are not authorized to view this user's subscriptions"
      );
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get all subscriptions in the database
 */
export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a subscription by its ID
 */
export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a subscription by its ID
 * `runValidators: true` ensures that schema validations still run
 */
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a subscription by its ID
 */
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, message: 'Subscription deleted' });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel a subscription (soft delete by setting status to 'cancelled')
 */
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true, runValidators: true }
    );

    if (!subscription) {
      const error = new Error('Subscription not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
