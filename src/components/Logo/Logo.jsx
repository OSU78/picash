import React from 'react';
import logo from './logo.svg';
import s from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {

    return (
        <Link to={"/"} className={`${s.logo}`} >
        <img src={logo} alt="logo" />
        </Link>
    );
    }

export default Logo;