const fs = require("fs");
//creamos la clase contenedor 
//class
class Contenedor {
  //metodo guardar
  async save(product) {
    let idAsignado = 0;
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let productos = JSON.parse(data);
      if (
        productos.some(
          (prod) => prod.title.toLowerCase() === product.title.toLowerCase()
        )
      ) {
        return { status: "error", message: "El producto ya existe" };
      } else {
        let producto = {
          id: productos[productos.length - 1].id + 1,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        };
        productos.push(producto);
        try {
          await fs.promises.writeFile(
            "./productos.txt",
            JSON.stringify(productos, null, 2)
          );
          idAsignado = producto.id;
          return {
            status: "success",
            message: "Producto añadido exitosamente. ID: " + idAsignado,
          };
        } catch (error) {
          return {
            status: "error",
            message: "Error al intentar añadir el producto: " + error,
          };
        }
      }
    } catch {
      let producto = [
        {
          id: 1,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        },
      ];
      try {
        await fs.promises.writeFile(
          "./productos.txt",
          JSON.stringify(producto, null, 2)
        );
        return {
          status: "success",
          message: "Producto añadido exitosamente. ID: 1",
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al intentar añadir el producto:" + error,
        };
      }
    }
  }
  //metodo obtener por id
  async getById(id) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let products = JSON.parse(data);
      let product = products.find((prod) => prod.id === id);
      return product
        ? { status: "success", product: product }
        : { status: "error", product: null };
    } catch (error) {
      return {
        status: "error",
        message: "Error al buscar el producto: " + error,
      };
    }
  }
  //metodo obtener aleatorio
  async getRandom() {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let products = JSON.parse(data);
      let id = Math.floor(Math.random() * (1, products.length) + 1);
      let product = products.find((prod) => prod.id === id);
      return product
        ? { status: "success", product: product }
        : { status: "error", product: null };
    } catch (error) {
      return {
        status: "error",
        message: "Error al buscar el producto: " + error,
      };
    }
  }
  //metodo leer 
  async getAll() {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let products = JSON.parse(data);
      return { status: "success", products: products };
    } catch (error) {
      return {
        status: "error",
        message: "Error al buscar el producto: " + error,
      };
    }
  }
  //borrar por id
  async deleteById(id) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      let products = JSON.parse(data);
      let productsAux = products.filter((prod) => prod.id !== id);
      try {
        await fs.promises.writeFile(
          "./productos.txt",
          JSON.stringify(productsAux, null, 2)
        );
        return {
          status: "success",
          message: "Producto eliminado exitosamente",
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al intentar eliminar el producto: " + error,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Error: " + error,
      };
    }
  }
  //metodo borrar todo
  async deleteAll() {
    await fs.promises.writeFile("./productos.txt", JSON.stringify([]));
  }
}

module.exports = Contenedor;

