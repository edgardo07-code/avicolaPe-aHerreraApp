import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import logo from './../../assets/logoAvicolapx.png'
const video = ""

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response?.data || "Failed to login");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          {/* Video de fondo */}
          <video className="background-video" autoPlay muted loop>
            <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          <div className="content">
            <h1>Ávicola PeñaHerrera.</h1>
            <p>
              Control de ventas en sistema integrado.
            </p>
            <span>No tienes una cuenta?</span>
            <Link to="/register">
              <button>Solicita Una</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={logo} alt="brand_logo" width={90} />
          <h1>Inicio de Sesión</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {err && <div className="msg">{err}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
