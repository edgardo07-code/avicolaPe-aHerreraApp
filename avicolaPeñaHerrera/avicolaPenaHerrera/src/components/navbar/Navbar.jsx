import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import logo from '../../assets/logoAvicolapx.png'
import logoBlanc from '../../assets/LogoAvicolaBlancpx.png'
import photo from '../../assets/photo.png'

const Navbar = ({ toggleLeftBar }) => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }} className="logo-container">
          <img src={darkMode ? logoBlanc : logo} alt="logo_app" width={40}/>
          <h4>Ávicola PeñaHerrera.</h4>
        </Link>
        <GridViewOutlinedIcon onClick={toggleLeftBar} />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        
        
      </div>
      <div className="right">
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={() => navigate('/profile')}>
          <img
            src={//*"http://localhost:8800/" + currentUser.profilePic
              photo}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;