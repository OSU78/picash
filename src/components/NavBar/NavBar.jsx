import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import s from "./NavBar.module.css";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { removeJWT } from "../../stores/AUTH/authSlice";

const NavBar = ({iconwhite=false}) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Current location is: ", location.pathname);
  }, [location]);

  const dispatch = useDispatch();


   // Add a new function for handling logout
   const handleLogout = () => {
    dispatch(removeJWT()); // This will remove the JWT and user data from the Redux store
    navigate('/'); // Redirect to home page
    toast.success('Déconnexion réussie!'); // Show success message
  };



  // Fonction pour déterminer le contenu du lien basé sur l'URL active
  const linkContent = (path, text, Icon) => {
    return location.pathname === path ? (
      <>
        <Icon style={{ marginRight: '4px' }}  />
        {text}
      </>
    ) : (
      <Icon style={{ fill : iconwhite ? "white" : "#5D24FF" }} />
    );
  };

  return (
    <div className={`flex flex-row w-full ${s.navBarContainer}`}>
      <nav className={s.navBar}>
        <ul className={`flex flex-row gap-3 justify-center items-center ${s.navList}`}>
          
          <li className={location.pathname === '/historique' ? s.activeLink : s.inactiveLink}>
            <Link to="/historique">
              {linkContent('/historique', 'Historique', HistoryIcon)}
            </Link>
          </li>

          <li className={location.pathname === '/scan' ? s.activeLink : s.inactiveLink}>
            <Link to="/scan">
              {linkContent('/scan', 'Scan', QrCodeScannerIcon)}
            </Link>
          </li>

          
          <li className={location.pathname === '/profil' ? s.activeLink : s.inactiveLink}>
            <Link to="/profil">
              {linkContent('/profil', 'Profil', AccountCircleIcon)}
            </Link>
          </li>

          <li onClick={handleLogout} className={location.pathname === '/logout' ? `${s.logout_btn} ${s.activeLink}` : `${s.logout_btn} ${s.inactiveLink}`}>
            <p >
              {linkContent('/logout', 'Deconnexion', LogoutIcon)}
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
