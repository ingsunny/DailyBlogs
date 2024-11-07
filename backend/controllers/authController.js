import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";

// Basic Signup

export const signup = async (req, res) => {
  const { name, email, password, countryCode, phoneNumber } = req.body;

  try {
    const catchDuplication = await User.findOne({ email });

    if (catchDuplication) {
      console.log("duplication not allowed");
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      countryCode,
      phoneNumber,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        countryCode: newUser.countryCode,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Basic Login/SignIn

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("this", email, password);
    // find user in db by email
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // // Step 4: Exclude password from user data
    const { password: hashedPassword, ...rest } = validUser._doc;

    const token = jwt.sign(rest, process.env.TOKEN_SECRET);

    res
      .cookie("token", token, {
        // httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
    ///
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Google Signup/Sigin

export const google = async (req, res) => {
  try {
    // find user in db by email
    const validUser = await User.findOne({ email: req.body.email });

    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.TOKEN_SECRET);

      const { password: hashedPassword, ...rest } = validUser._doc;

      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET);

      const { password: hashedPassword2, ...rest } = newUser._doc;

      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};
