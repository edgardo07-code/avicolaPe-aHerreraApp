import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import photo from '../../assets/photo.png';

const LeftBar = ({ leftBar }) => {
  const { currentUser, logout } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const handleNavigate = (dir) => {
    navigate(dir);
  }

  return (
    <div className={`leftBar ${leftBar ? 'visible' : ''}`}>
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={photo}
              alt="User"
            />
            <span>{currentUser.full_name}</span>
          </div>
          <div className="item" onClick={() => handleNavigate('/customers')}>
            <span>Clientes</span>
          </div>
          <div className="item" onClick={() => handleNavigate('/products')}>
            <span>Productos</span>
          </div>
        </div>
        <div className="config">
          <PowerSettingsNewIcon className="close-session" onClick={() => logout() }/>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
