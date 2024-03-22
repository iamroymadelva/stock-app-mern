import { Schema, model } from 'mongoose'

export const ROLES = ["Admin", "Editor", "Viewer", "User"]

const roleSchema = new Schema({
  name: String,
}, {
  versionKey: false
})

export default model("Role", roleSchema)