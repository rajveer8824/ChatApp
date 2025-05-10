import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";


export const signup = async (req, res) => {
  const { fullname, email, password, ConfirmPassword } = req.body;
  try {
    // Check if passwords do not match
    if (password == ConfirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists", newUser: user });
    }

    // Hashing password
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });
    await newUser.save();

    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and include the password field
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "Invalid user credentials" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid user credentials" });
    }

    // Generate a token and save it in cookies
    createTokenAndSaveCookie(user._id, res);

    // Send a success response
    res.status(200).json({
      message: "User login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt")
    res.status(201).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });

  }};

  export const allUsers = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUser },
      }).select("-password");
      res.status(201).json(filteredUsers);
    } catch (error) {
      console.log("Error in allUsers Controller: " + error);
    }
  };