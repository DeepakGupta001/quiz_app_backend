const Admin = require("../models/admin_model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const create_admin = async (req, res) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    res.status(201).json({ success: true, data: admin });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login_admin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    
    admin.token = token;
    await admin.save();

    res.status(200).json({
      success: true,
      data: admin,
      token: token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  create_admin,
  login_admin,
};
