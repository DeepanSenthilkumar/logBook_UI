import icon from '../../assets/icon.png'
import './Navbar.css'
import '../../index.css'
import Menu from '../menu/Menu'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

type MenuOption = {
  label: string;
  path?: string;
  action?: () => void;
};

type MenuConfig = Record<string, MenuOption[]>;

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const hideMenu = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuConfig: MenuConfig  = {
    "/visitor": [{ label: "Back to Home", path: "/" }],
    "/admin": [
      { label: "Back to Home", path: "/" },
      { label: "Logout", action: handleLogout }
    ],
    "/login": [{ label: "Back to Home", path: "/" }]
  };

  const options = menuConfig[location.pathname] || [];

  return (
    <>
    <header className= {`nav-wrapper ${hideMenu ? 'home-layout' : 'other-layout'}`}>
      <div className="nav">
       <img src={icon} className='icon-Container' alt="Icon" />
       
        {!hideMenu && options.length > 0 && (
          <Menu options={options} onNavigate={(path?: string) => {
              if (path) navigate(path);
            }} />
        )}
      </div>
    </header>
    </>
  )
}

export default Navbar