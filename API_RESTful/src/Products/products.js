const products = []

let id = 1

const listOfProducts = () => {
  return products
}

const getProduct = (id) => {
  return (products.find(product => product.id === parseInt(id)) || { error: 'Producto no encontrado' })
}

const addProduct = (product) => {
  const prod = {
    id: id,
    name: product.name,
    price: product.price,
    thumbnail: product.thumbnail
  }
  products.push(prod)
  id++
  return (prod || { error: 'No se pudo cargar el producto, revise los datos' })
}

const updateProduct = (id, newContent) => {
  const product = getProduct(parseInt(id))
  if ((product.id == id) && (product.id != null)) {
    product.name = newContent.name
    product.price = newContent.price
    product.thumbnail = newContent.thumbnail
    return product
  } else {
    return 'Producto no encontrado'
  }
}

const deleteProduct = (id) => {
  const product = getProduct(parseInt(id))
  if ((product.id == id) && (product.id != null)) {
    products.splice(products.indexOf(product), 1)
    return 'Producto eliminado'
  } else {
    return 'Producto no encontrado'
  }
}

module.exports = { listOfProducts, getProduct, addProduct, updateProduct, deleteProduct }