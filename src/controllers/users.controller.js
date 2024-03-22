import Users from "../models/User.js";
import Role from "../models/Role.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesExists = await Role.find({ name: { $in: roles } }); ///Validate if the roles already exists in the db.

    // creating a new User
    const user = new Users({
      username,
      email,
      password,
      roles: rolesExists.map((role) => role._id),
    });

    // encrypting password
    user.password = await Users.encryptPassword(user.password);

    // saving the new user
    const newUser = await user.save();

    return res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const allUsers = await Users.find()
  res.json(allUsers)
}


export const getUser = async (req, res) => {
  const user = await Users.findById(req.params.userId);
  return res.json(user);
};

// export const getUserByEmail = async (req, res) => {
//   const user = await User.findByEmail(req.params.userEmail);
//   return res.json(user);
// };

export const updateUser = async (req, res) => {
  const updatedUser = await Users.findByIdAndUpdate(req.params.userId, req.body, {
    new: true
  })
  res.status(200).json({message: "User updated successfully.", User: updatedUser})
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params
  const deletedUser = await Users.findByIdAndDelete(userId)
  res.status(200).json({message: `The User with ID: ${deletedUser._id} was deleted successfully.` })
  //res.status(200).json(deletedUser) //If you want to show the data from deleted User
}