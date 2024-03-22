///Verifies if users are sending the token and authorizes login
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]

    console.log(token)

    if (!token) return res.status(403).json({ message: "No token provided." });//Validate token provided

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 })//requires userId. Password not required. If password is required, set value password: 1
    if (!user) return res.status(404).json({ message: "User not found." })

    next();///Continue with next route
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized Token.' })
  }
}

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "Editor") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Editor role is required to perform this action." })
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "Admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "Admin role is required to perform this action." })
}