import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getCustomers = (req, res) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT * FROM customers`;

    

    db.query(q, (err, data) => {
      
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });

}


export const addCustomer = (req, res) => {
  const token = req.cookies.accessToken;
  console.log(req.body);
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    
    const { name, nit, address, phone, route_id } = req.body;

    if (!name || !nit || !address || !phone || !route_id) {
      return res.status(400).json("All fields are required!");
    }

    const q = `
      INSERT INTO customers (name, nit, address, phone, route)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(q, [name, nit, address, phone, route_id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Customer created successfully!");
    });
  });
};

export const updateCustomer = (req, res) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { id } = req.params;
    const { name, nit, address, phone, route_id } = req.body;

    if (!name || !nit || !address || !phone || !route_id) {
      return res.status(400).json("All fields are required!");
    }

    const q = `
      UPDATE customers
      SET name = ?, nit = ?, address = ?, phone = ?, route = ?
      WHERE customer_id = ?
    `;

    db.query(q, [name, nit, address, phone, route, id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.status(200).json("Customer updated successfully!");
      } else {
        return res.status(404).json("Customer not found!");
      }
    });
  });
};

export const deleteCustomer = (req, res) => {
  const token = req.cookies.accessToken;
  
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { id } = req.params;

    const q = `
      DELETE FROM customers
      WHERE customer_id = ?
    `;

    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.status(200).json("Customer deleted successfully!");
      } else {
        return res.status(404).json("Customer not found!");
      }
    });
  });
};

