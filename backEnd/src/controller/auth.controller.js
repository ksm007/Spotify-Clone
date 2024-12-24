import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    console.log("entering auth callback");

    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });
    console.log(user);

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
    console.log("error in auth callback", error.message);

    res.status(500).json({ message: "Internal Server error", error });
    next(error);
  }
};
