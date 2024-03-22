import { ROLES } from "../models/Role"
import User from "../models/User"

export const checkRepeatedUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  const userExists = await User.findOne({ username })
  if (userExists) return res.status(400).json({ message: `The user ${username} is already registered.` });

  const emailExists = await User.findOne({ email })
  if (emailExists) return res.status(400).json({ message: `The email ${email} is already registered.` });

  next();
}

export const checkRoleExists = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `The role ${req.body.roles[i]} does not exists:.` ///
        })
      }
    }
  }
  next();
}