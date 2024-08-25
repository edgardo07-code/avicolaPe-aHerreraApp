import { useContext } from 'react';
import './home.scss';
import { AuthContext } from '../../context/authContext';

const Home = () => {

  const { currentUser } = useContext(AuthContext)
  return (
    <div className="home">
      <h1>Hola {currentUser.name}</h1>
      
    </div>
  )
}

export default Home