import Product from '../models/Products'

// Función para validar el formato de la ID del producto
const isValidProductId = (productId) => {
  // Verifica si la ID tiene una longitud de 24 caracteres y consiste en caracteres alfanuméricos
  return /^[0-9a-fA-F]{24}$/.test(productId);
};

export const createProduct = async (req, res) => {

  const {name, category, price, imgURL} = req.body

  const newProduct = new Product({name, category, price, imgURL})
  const savedProduct = await newProduct.save()
  //console.log(newProduct)
  res.status(201).json(savedProduct)//201 - new resource has been created
}

export const getProducts = async (req, res) => {
  const allProducts = await Product.find()
  res.json(allProducts)
}

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Verifica si la ID tiene el formato adecuado
    if (!isValidProductId(productId)) {
      // Si la ID no tiene el formato adecuado, responde con un mensaje de error
      return res.status(400).json({ message: 'ID de producto no válida' });
    }

    // Busca el producto por ID
    const product = await Product.findById(productId);

    // Verifica si el producto no existe
    if (!product) {
      // Si el producto no existe, responde con un mensaje de error
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Si el producto existe, responde con el producto encontrado
    res.status(200).json(product);
  } catch (error) {
    // Si ocurre un error, responde con un mensaje de error
    res.status(500).json({ message: 'Error al buscar el producto por ID' });
  }
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true
  })
  res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
  const { productId } = req.params
  const deletedProduct = await Product.findByIdAndDelete(productId)
  res.status(200).json(deletedProduct)
  //res.status(200).json(deletedProduct) //If you want to show the data from deleted product
}
