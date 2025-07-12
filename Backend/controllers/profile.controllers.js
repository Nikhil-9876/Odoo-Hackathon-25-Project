import { User } from "../models/user.models.js";
export const getProfile = (req, res) => {
  const usernameToFind = req.params.username;
  User.findOne({ username: usernameToFind })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.json({
        success: true,
        user: user,
      });
    })
    .catch((err) => {
      console.error("Profile fetch error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch profile",
        error: err.message,
      });
    });
};
export const updateProfile = (req, res) => {
  const usernameToUpdate = req.params.username;
  const { email, skillOffered, skillWanted } = req.body;

  // Prepare update object
  const updateData = { updatedAt: new Date() };

  // Add fields to update only if they are provided
  if (email !== undefined) updateData.email = email;
  if (skillOffered !== undefined) {
    // Ensure skillOffered is an array and filter out empty strings
    updateData.skillOffered = Array.isArray(skillOffered)
      ? skillOffered.filter((skill) => skill && skill.trim() !== "")
      : [];
  }
  if (skillWanted !== undefined) {
    // Ensure skillWanted is an array and filter out empty strings
    updateData.skillWanted = Array.isArray(skillWanted)
      ? skillWanted.filter((skill) => skill && skill.trim() !== "")
      : [];
  }

  User.findOneAndUpdate({ username: usernameToUpdate }, updateData, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    })
    .catch((err) => {
      console.error("Profile update error:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error: err.message,
      });
    });
};
