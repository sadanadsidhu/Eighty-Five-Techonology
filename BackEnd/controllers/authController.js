const db = require("../models");

//create main Model
const User = db.users;

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    // Create a new user record in the database
    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

////////////////---------LOGIN-----------------------------------------------////////////

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid Password" });
    }
    // const { password, ...data } = user;
    // console.log("data", data);

    res.status(200).json({ message: "Login successful", userid: user.id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { signup, login };
