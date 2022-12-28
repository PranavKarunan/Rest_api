import bcrypt from "bcrypt";
import User from "../model/user.js";
import accessToken from "../helpers/auth.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNumber, password } = req.body;
    console.log(firstName, lastName, email, mobileNumber);
    const { user } = await User.find({ email: email });
    if (!user) {
      let randomNumber = Math.floor(Math.random() * 100);
      let hashedPassword = await bcrypt.hash(password, 10);
      let newUser = await new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: firstName + lastName + randomNumber,
        mobileNumber: mobileNumber,
        password: hashedPassword,
      }).save();
      const token = accessToken(newUser);
      res
        .status(201)
        .json({ newUser, token, message: "account created successfully" });
    } else {
      res.status(400).json({ message: "user already exists" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      console.log(user);
      const valid = await bcrypt.compare(password, user.password);
      console.log(valid);
      if (valid) {
        const token = accessToken(user);
        res.status(200).json({ user, token, message: "login success" });
      } else {
        res.status(403).json({ message: "password mismatch" });
      }
    } else {
      res.status(403).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(error.status).json({ message: "error.message" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userName, newPassword } = req.body;
    const user = await User.findOne({ userName });
    const valid = await bcrypt.compare(newPassword, user.password);
    if (valid) {
      res.status(403).json({ message: "you cannot use older password" });
    } else {
      console.log("not same");
      const password = await bcrypt.hash(newPassword, 10);
      await User.findOneAndUpdate(
        { userName },
        { $set: { password: password } }
      );
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const userList = async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};
