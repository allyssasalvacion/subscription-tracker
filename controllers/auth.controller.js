import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/env.js';

export const signUp = async (req, res, next) => {
  // Start a new MongoDB session for transaction support
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Extract user input from request body
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('User already exists');
      error.status = 409; // Conflict status code
      throw error;
    }

    // Generate salt and hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user inside the transaction session
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // Generate JWT token for the newly created user
    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Commit the transaction after successful user creation
    await session.commitTransaction();
    session.endSession();

    // Send success response with token and user data
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    // Roll back the transaction if any error occurs
    await session.abortTransaction();
    session.endSession();
    next(error); // Pass error to the global error handler
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.status = 404; // Not Found status code
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('The password is incorrect');
      error.status = 401; // Unauthorized status code
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Send success response with token and user data
    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'User signed out successfully',
    });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};

export const getUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, '-password'); // Exclude password field

    // Send success response with user data
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};
