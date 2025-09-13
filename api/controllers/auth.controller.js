import User from "../models/users.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// SIGN UP
export const signup = async (req, res, next) => {
  const { username, email, password, adminKey } = req.body;

  // Έλεγχος αν υπάρχει ήδη ο χρήστης
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Κρυπτογράφηση password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Default ρόλος
  let role = "user";
  if (adminKey && adminKey === process.env.ADMIN_KEY) {
    role = "admin";
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      role: newUser.role,
    });
  } catch (error) {
    next(error);
  }
};

// SIGN IN
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Invalid Username or Password"));

    // Φτιάχνουμε token με id + role
    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...rest, role: validUser.role });
  } catch (error) {
    next(error);
  }
};

// GOOGLE SIGN IN

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      // Επιστρέφουμε ήδη υπάρχοντα χρήστη
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(user);
    } else {
      // Δημιουργούμε νέο χρήστη
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        avatar: req.body.avatar,
        role: 'user', // default role
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(newUser);
    }
  } catch (error) {
    next(error);
  }
};


// SIGN OUT
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
