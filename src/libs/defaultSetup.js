import Role from '../models/Role'

export const createDefaultRoles = async () => {
  try {
    const existingRoles = await Role.estimatedDocumentCount()

    if (existingRoles > 0) return;
    const defaultRoles = await Promise.all([
    new Role({ name: 'Admin' }).save(),
    new Role({ name: 'Editor' }).save(),
    new Role({ name: 'Viewer' }).save(),
    new Role({ name: 'User' }).save(),
  ])

console.log(defaultRoles)
  } catch (error) {
    console.error(error)
  }

}