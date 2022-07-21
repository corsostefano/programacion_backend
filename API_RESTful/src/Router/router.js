const express = require("express");
const { Router } = express;
const router = Router();
const Actions = require("../Controller/controller");

// devolver todos los productos
router.get("/", (req, res) => {
  res.send(Actions.getAll());
});

// devolver un producto por id
router.get("/:id", (req, res) => {
  const {id} = req.params;
  res.send(Actions.getOne(id));
});

// Añadir un nuevo producto
router.post("/", (req, res) => {
  res.send(Actions.add(req.body));
});

// Actualizar un producto
router.put("/:id", (req, res) => {
  const {id} = req.params
  const body = req.body
  res.send(Actions.update(id, body));
});

// Eliminar Producto
router.delete("/:id", (req, res) => {
  res.send(Actions.delete(req.params.id));
})


module.exports = router;