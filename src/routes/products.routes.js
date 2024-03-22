import {Router} from 'express'
const router = Router()

import * as productsController from '../controllers/products.controller'
import {jwtAuth} from '../middlewares'

//Products management
router.post('/create',[jwtAuth.verifyToken, jwtAuth.isModerator], productsController.createProduct)
router.get('/', productsController.getProducts)
router.get('/:productId', productsController.getProductById)
router.put('/update/:productId', [jwtAuth.verifyToken, jwtAuth.isAdmin], productsController.updateProductById)
router.delete('/delete/:productId', [jwtAuth.verifyToken, jwtAuth.isAdmin], productsController.deleteProductById)

export default router;