import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Obtener todos los productos
export const getProducts = (req, res) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM products";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

// Agregar un nuevo producto
export const addProduct = (req, res) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { product_name, description, price } = req.body;
    if (!product_name || !price) return res.status(400).json("Product name and price are required.");
    if (price <= 0) return res.status(400).json("Price must be greater than zero.");

    const q = "INSERT INTO products (`product_name`, `description`, `price`) VALUES (?, ?, ?)";
    const values = [product_name, description, price];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Product has been created.");
    });
  });
};

// Actualizar un producto
export const updateProduct = (req, res) => {
  console.log(req.body);
  
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { id, product_name, description, price } = req.body;
    if (!id || !product_name || price === undefined) return res.status(400).json("Product ID, name, and price are required.");
    if (price <= 0) return res.status(400).json("Price must be greater than zero.");

    const query = "UPDATE products SET product_name = ?, description = ?, price = ? WHERE product_id = ?";
    const values = [product_name, description, price, id];

    db.query(query, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Product updated successfully.");
      return res.status(404).json("Product not found.");
    });
  });
};

// Eliminar un producto
export const deleteProduct = (req, res) => {
  
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const productId = req.params.id;
    if (!productId) return res.status(400).json("Product ID is required.");

    const query = "DELETE FROM products WHERE product_id = ?";
    db.query(query, productId, (err, data) => {
      console.log(err,data);
      
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("El producto fue eliminado.");
      return res.status(404).json("Product not found.");
    });
  });
};
