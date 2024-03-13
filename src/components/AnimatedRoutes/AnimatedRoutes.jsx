// Importez vos composants de page
import exp from "constants";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import { useLocation } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import {AnimatePresence} from 'framer-motion'

const AnimatedRoutes = () => {
    const location = useLocation();


  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
