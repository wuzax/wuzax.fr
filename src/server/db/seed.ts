import { User } from "../models/User.js";

export async function createDefaultUser() {
  try {
    // Check if default user already exists
    const existingUser = await User.findOne({ username: "admin@example.com" });

    if (!existingUser) {
      // Create default admin user
      const defaultUser = new User({
        username: "admin@example.com",
        password: "your_secure_password", // Change this to a secure password
      });

      await defaultUser.save();
      console.log("Default admin user created successfully");
    } else {
      console.log("Default admin user already exists");
    }
  } catch (error) {
    console.error("Error creating default user:", error);
  }
}
