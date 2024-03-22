import {Router} from 'express'
const router = Router()

import * as productsController from '../controllers/products.controller'

//Products management
router.post('/create', productsController.createProduct)
router.get('/', productsController.getProducts)
router.get('/:productId', productsController.getProductById)
router.put('/update/:productId', productsController.updateProductById)
router.delete('/delete/:productId', productsController.deleteProductById)

export default router;