const User = require("../models/user_model");

const create_user_controller = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const get_user_controller = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL params

  try {
    if (id) {
      const user = await User.findById(id).exec();
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    } else {
      const users = await User.find().exec();
      return res.status(200).json({ success: true, data: users });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const update_user_controller = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).exec();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  create_user_controller,
  get_user_controller,
  update_user_controller,
};
