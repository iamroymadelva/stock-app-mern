import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { signupValidation } from '../middlewares'

router.post('/login', authController.signIn)

router.post('/signup', [signupValidation.checkRepeatedUsernameOrEmail, signupValidation.checkRoleExists], authController.signUp)

export default router;