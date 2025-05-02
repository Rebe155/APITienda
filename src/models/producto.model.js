const sql = require('./db.js');

// Constructor
const Producto = function(producto) {
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.preciodecosto = producto.preciodecosto;
    this.preciodeventa = producto.preciodeventa;
    this.cantidad = producto.cantidad;
    this.fotografia = producto.fotografia;
};

// Obtener todos los productos
Producto.getAll = (result) => {
    sql.query('SELECT * FROM productos', (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Obtener producto por ID
Producto.findById = (id, result) => {
    sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

// Crear nuevo producto
Producto.create = (newProducto, result) => {
    sql.query('INSERT INTO productos SET ?', newProducto, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newProducto });
    });
};

// Actualizar producto
Producto.updateById = (id, producto, result) => {
    sql.query(
        'UPDATE productos SET nombre = ?, descripcion = ?, preciodecosto = ?, preciodeventa = ?, cantidad = ?, fotografia = ? WHERE id = ?',
        [producto.nombre, producto.descripcion, producto.preciodecosto, producto.preciodeventa, producto.cantidad, producto.fotografia, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...producto });
        }
    );
};

// Eliminar producto
Producto.remove = (id, result) => {
    sql.query('DELETE FROM productos WHERE id = ?', id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Producto;