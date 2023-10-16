import { createError } from "../middlewares/error.js";
import User from "../models/User.js";

// Get All User
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get detail user

export const getDetailUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(createError(404, "Not found user Id"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update User

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findById(userId, { ...req.body });
    res.status(200).json("Update user success");
  } catch (error) {
    next(error);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId, { ...req.body });
    res.status(200).json(`Delete user ${req.params.userId} success!`);
  } catch (error) {}
};

// Count User

export const getCountUser = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
