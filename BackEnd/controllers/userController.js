const db = require("../models");

//create main Model
const User = db.users;

//main work

// 1.create user
const addUser = async (req, res) => {
  let info = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(info);
  res.status(200).send(user);
  // console.log(user);
};
//2. get single user

const getOneUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({
    where: { id: id },
  });
  res.status(200).send(user);
};
module.exports = {
  addUser,
  getOneUser,
};
