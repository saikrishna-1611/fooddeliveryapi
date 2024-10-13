import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ValidatePhoneNumber from "../utils/validatePhoneNum.js";

export const register = async (req, res) => {
  try {
    const { username, phoneNumber, age, pincode, password } = req.body;
    
    if (!username || !phoneNumber || !age || !pincode || !password) {
      return res.status(400).json({ status: 'fail', message: 'Enter all fields' });
    }

    if (!ValidatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ status: 'fail', message: 'Enter a valid 10-digit phone number' });
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ status: 'fail', message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, phoneNumber, age, pincode, password: hashedPassword });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ status: 'fail', message: 'Enter phone number and password' });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

import Restaurant from "../models/restaurantmodel.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, location, genre } = req.body;
    const {_id:owner,username, phoneNumber } = req.user;
    if (!name || !owner || !location || !genre || !phoneNumber) {
      return res.status(400).json({ status: 'fail', message: 'Enter all fields' });
    }

    const existingRestaurant = await Restaurant.findOne({ name, phoneNumber });
    if (existingRestaurant) {
      return res.status(400).json({ status: 'fail', message: 'Restaurant already exists' });
    }

    const restaurant = new Restaurant(
      {name, 
      owner:req.user.username,
      location,
       genre, 
       phoneNumber}
      );
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const restaurant = await Restaurant.findOne({ name, phoneNumber });
    if (!restaurant) {
      return res.status(404).json({ status: 'fail', message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

import Item from "../models/itemmodel.js";

export const addItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const item = new Item({ restaurant: req.user.restaurantId, name, price });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const menuItems = await Item.find({ restaurant: req.params.restaurantId });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

import Order from "../models/ordermodel.js";

export const placeOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const order = new Order({ user: req.user.id, restaurant: restaurantId, items, totalPrice, deliveryAddress });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Failed to place order' });
  }
};

