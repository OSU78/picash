import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./NavBar.module.css";
import Logo from "../Logo/Logo";



const NavBar = () => {
    const currentLocation = useLocation();

    useEffect(() => {
        console.log("Current location is: ", currentLocation.pathname);
    }, [currentLocation]);

    // Fonction pour vérifier si le lien est l'emplacement actuel
    const isActive = (path) => {
        return currentLocation.pathname === path;
    };

    return (
        <div>
            <nav className="flex justify-between flex-row">
                <Logo />    
                <ul className="flex flex-row items-center justify-center gap-2">
                    <li className={isActive('/') ? `${s.link_active}` : `${s.link_}`}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={isActive('/register') ? `${s.link_active}` : `${s.link_}`}>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
