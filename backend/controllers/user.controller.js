import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error from register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials (email)", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials (password)", success: false });
    }

    if (role != user.role) {
      return res
        .status(400)
        .json({ message: "Invalid credentials (role)", success: false });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
      .json({
        massage: `Login successful ,Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Internal server error from login", success: false });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // resume file

    const userId = req.id; // Middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      console.error("User not found with ID:", userId);
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (!user.profile) {
      user.profile = {};
    }

    // Only update fields that are provided in the request
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills)
      user.profile.skills = skills.split(",").map((skill) => skill.trim());

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // bio: user.bio,
      // skills: user.skills,
      role: user.role,
      profile: {
        bio: user.profile.bio || "",
        skills: user.profile.skills || [],
        resume: file ? file.path : user.profile?.resume || "", // Use existing resume if not updated
        resumeOriginalName: file
          ? file.originalname
          : user.profile?.resumeOriginalName || "", // Use existing original name if not updated
        profilePicture: user.profile?.profilePicture || "", // Use existing profile picture if not updated
      },
    };

    console.log(updatedUser);
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
