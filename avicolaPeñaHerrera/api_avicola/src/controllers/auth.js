import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password, name } = req.body;

  // Validar datos del usuario
  if (!username || !email || !password || !name) {
    return res.status(400).json("Todos los campos son obligatorios.");
  }

  if (password.length < 6) {
    return res.status(400).json("La contraseña debe tener al menos 6 caracteres.");
  }

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("¡El usuario ya existe!");

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";

    const values = [username, email, hashedPassword, name];

    db.query(q, [values], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Usuario creado con éxito.");
    });
  });
};


export const login = (req, res) => {
  // Obtener el nombre de usuario de la solicitud
  const { username, password } = req.body;

  // Verificar que el nombre de usuario y la contraseña estén presentes
  if (!username || !password) {
    return res.status(400).json("El usuario y la contraseña son requeridos.");
  }

  // Consulta para encontrar el usuario en la base de datos
  const q = `SELECT * FROM users WHERE username = ?`;

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("El usuario no existe en nuestra base de datos!");

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const checkPassword = bcrypt.compareSync(password, data[0].password);
    if (!checkPassword) return res.status(400).json("Usuario o contraseña inválidos!");

    // Generar el token JWT con una fecha de expiración
    const token = jwt.sign({ id: data[0].id }, "secretkey", { expiresIn: '1h' });

    // Eliminar la contraseña del usuario en la respuesta
    const { password: _, ...userData } = data[0];

    // Enviar el token como una cookie
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Asegúrate de usar cookies seguras en producción
        sameSite: 'strict', // Para prevenir ataques CSRF
      })
      .status(200)
      .json(userData);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
};