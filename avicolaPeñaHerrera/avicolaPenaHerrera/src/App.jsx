import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContext, useState } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Home from './views/home/Home';
import { AuthContext } from './context/authContext';
import { DarkModeContext } from './context/darkModeContext';
import './styles.scss';
import Navbar from './components/navbar/Navbar';
import LeftBar from './components/leftBar/LeftBar';
import Customers from './views/customers/Customers';
import RightBar from './components/rightBar/RightBar';
import Products from './views/products/Products';

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();
  
  const Layout = () => {
    const [leftBar, setLeftBar] = useState(false);
    const toggleLeftBar = () => {
      console.log('click');
      setLeftBar(prevState => !prevState)};

    return (
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar toggleLeftBar={toggleLeftBar}/>
          <div style={{ display: "flex" }}>
            <LeftBar leftBar={leftBar}/>
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar/>
          </div>
        </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/products",
          element: <Products />,
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
