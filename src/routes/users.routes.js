import {Router} from 'express'
const router = Router()

import * as userController from "../controllers/users.controller";
import { jwtAuth, signupValidation } from '../middlewares'

//Users management
router.post('/create', [
  jwtAuth.verifyToken,
  jwtAuth.isAdmin,
  signupValidation.checkRoleExists
],userController.createUser)

router.get('/all-users', userController.getUsers)
router.get('/:userId', userController.getUser)
// router.get('/:userEmail', userController.getUserByEmail)
router.put('/update/:userId', [jwtAuth.verifyToken, jwtAuth.isAdmin], userController.updateUser)
router.delete('/delete/:userId', [jwtAuth.verifyToken, jwtAuth.isAdmin], userController.deleteUser)


export default router;