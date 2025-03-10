const express = require("express");

const User = require("../Models/User.js");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

//Post /api/users/register  - it will register a new user and access is public.

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    user = new User({ name, email, password });
    await user.save();

    // res.status(201).json({
    //   user: {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    // });

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with the user data

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.status(201).json({
          user: {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error), res.status(500).send("Server Error");
  }
});

// Post /api/users/login  Authenticate user  and access public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Details" });

    // const isMatch = await user.matchPassword(password);
    // if (!isMatch) return res.status(400).json({ message: "Invalid Details" });

    // create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.json({
          user: {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Get /api/users/profile Get the loged in user's profile(protected Route) access will be private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
