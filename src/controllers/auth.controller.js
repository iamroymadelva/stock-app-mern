import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';


export const signUp = async (req, res) => {

  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })//Validate if received roles exists in db
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({ name: "User" });//If user has not an assigned role, set role "User" by default
    newUser.roles = [role._id];
  };

  const savedUser = await newUser.save();
  console.log(savedUser);

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400 //24 hrs
  });

  console.log(newUser);

  res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const userExists = await User.findOne({ email }).populate("roles");

  if (!userExists) return res.status(400).json({ message: 'User not found.' });

  const matchPassword = await User.comparePassword(password, userExists.password);

  if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid password." })

  const token = jwt.sign({ id: userExists._id }, config.SECRET, {
    expiresIn: 86400 //24 hrs
  })

  res.json({ token })

};


