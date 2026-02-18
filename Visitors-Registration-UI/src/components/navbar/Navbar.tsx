import icon from '../../assets/icon.png'
import './Navbar.css'
import '../../index.css'
import Menu from '../menu/Menu'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { info, error } from '../toaster/toaster';
import api from '../../service/api.service.ts';
import { useLoader } from "../../components/loader/LoaderContext.tsx";

type MenuOption = {
  label: string;
  path?: string;
  action?: () => void;
};

type MenuConfig = Record<string, MenuOption[]>;

const Navbar = () => {
  const { showLoader, hideLoader } = useLoader();

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const hideMenu = location.pathname === "/";

  const handleLogout = async() => {
    showLoader();
    try{
      const response = (await api.logoutUser()) as any;
      if(response.loggedOut) {
        logout();
        hideLoader();
        info("Visit Again", "Logged Out");
        navigate("/login");
      }
    }catch (err) {
      error("Unexpected Error Happened");
      console.log(err);
    }
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