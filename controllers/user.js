const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SignUp

exports.SignUp = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ status: "error", message: "Email already exists!!!" });
      }
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.json({
        status: "ok",
        message: "SignUp Success!!",
      });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };
  

// Login

exports.SignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ status: "error", message: "Invalid UserName/Password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ status: "error", message: "Invalid UserName/Password" });
      }
      const token = jwt.sign({ email: user.email, userId: user._id }, 'secretKey', { expiresIn: '1h' });
      return res.status(200).json({ status: "ok", message: "Login success", token });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };
  