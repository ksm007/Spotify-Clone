import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    console.log("entering auth callback");

    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });
    if (!user) {
      // sign up
      await User.create({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};
