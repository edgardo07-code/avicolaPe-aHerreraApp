import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/LogoAvicolaBlancpx.png';
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });

  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook para redirección

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setShowPasswordConfirmation(value.length > 0);
    }
  };

  const validateForm = () => {
    const { username, email, password, passwordConfirmation, name } = formData;

    if (!username || !email || !password || !name) {
      setError("Todos los campos son obligatorios.");
      return false;
    }

    if (password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return false;
    }

    if (password.length < 6) { // Puedes ajustar la longitud mínima
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error and success messages
    setError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    try {
      // Send formData to the backend
      await axios.post('http://localhost:8800/api/auth/register', formData);
      
      setSuccessMessage("Registro exitoso.");

      // Clear the form
      setFormData({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (err) {
      setError(err.response?.data || "Error al enviar la solicitud");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          {/* Video de fondo */}
          <video className="background-video" autoPlay muted loop>
            <source src="video-path.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          <div className="content">
            <img src={logo} alt="brand_logo" width={90} />
            <p>Control de ventas en sistema integrado.</p>
            <span>Ya tienes una cuenta?</span>
            <Link to="/login">
              <button>Inicia Sesión</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>Crear Usuario</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {showPasswordConfirmation && (
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
            )}
            {error && <div className="msg">{error}</div>}
            {successMessage && <div className="msg-success">{successMessage}</div>}
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
