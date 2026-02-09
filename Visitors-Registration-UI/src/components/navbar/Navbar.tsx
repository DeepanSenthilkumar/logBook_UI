import icon from '../../assets/icon.png'
import './Navbar.css'
import '../../index.css'
import Menu from '../menu/Menu'
import { useLocation, useNavigate } from "react-router-dom";

type MenuOption = {
  label: string;
  path: string;
};

type MenuConfig = Record<string, MenuOption[]>;

const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const hideMenu = location.pathname === "/";

  const menuConfig: MenuConfig  = {
    "/visitor": [{ label: "Back to Home", path: "/" }],
    "/admin": [
      { label: "Back to Home", path: "/" },
      { label: "Logout", path: "/login"}
    ],
    "/login": [{ label: "Back to Home", path: "/" }]
  };

  const options = menuConfig[location.pathname] || [];

  return (
    <>
    <header className='nav-wrapper'>
      <div className="nav">
       <img src={icon} className='icon-Container' alt="Icon" />
       
        {!hideMenu && options.length > 0 && (
          <Menu options={options} onNavigate={navigate} />
        )}
      </div>
    </header>
    </>
  )
}

export default Navbar