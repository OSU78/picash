// Importez vos composants de page
import exp from "constants";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import { useLocation } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Scan from "../Scan/Scan.jsx";
import {AnimatePresence} from 'framer-motion'
import Historique from "../Historique/Historique.jsx";
import Profil from "../Profil/Profil.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getJWT } from "../../stores/AUTH/authSlice";

const AnimatedRoutes = () => {
    const location = useLocation();

    const dispatch = useDispatch(); // Use useDispatch to dispatch actions
    useEffect(() => {
      // Dispatch an action to check for the JWT in sessionStorage/cookies and update the store
      dispatch(getJWT());
    }, []); // Empty dependency array means this effect runs once on mount
  

  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/historique" element={<Historique />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
