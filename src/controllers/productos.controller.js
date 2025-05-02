const ProductoModel = require('../models/producto.model');

exports.findAll = (req, res) => {
    ProductoModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al obtener los productos."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    ProductoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Producto no encontrado con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error al obtener el producto con id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const producto = new ProductoModel({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        preciodecosto: req.body.preciodecosto,
        preciodeventa: req.body.preciodeventa,
        cantidad: req.body.cantidad,
        fotografia: req.body.fotografia
    });

    ProductoModel.create(producto, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al crear el producto."
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    ProductoModel.updateById(
        req.params.id,
        new ProductoModel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Producto no encontrado con id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error al actualizar producto con id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    ProductoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Producto no encontrado con id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el producto con id " + req.params.id
                });
            }
        } else res.send({ message: "Producto eliminado exitosamente!" });
    });
};