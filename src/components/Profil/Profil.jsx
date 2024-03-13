import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { CircleHelp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordInput from "../PasswordInput/PasswordInput";
import { toast, Toaster } from "react-hot-toast";
import APIClient from "../../API/API"; // Assurez-vous que le chemin vers APIClient est correct
import HandRegister from "../../assets/img/HandRegister.png";
import s from "./Profil.module.css";
import NavBar from "../NavBar/NavBar";
import UserProfile from "../UserProfile/UserProfile";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { setCookie, getCookie } from '../../ConfigPicash.jsx';



const Profil = () => {
  
  const navigate = useNavigate();

  const userData = getCookie("jwt_token_picash")
  ? getCookie("jwt_token_picash")
  : null;

  const [userDataDecode, setUserDataDecode] = useState(null);
  useEffect(() => {
    console.log("userData : ",userData);
    // Check if userData is not present and redirect to "/" if true
    if (!userData) {
     navigate('/');
      
    }
    else{
      try{
        setUserDataDecode(
          jwtDecode(userData)
        )
      }
      catch(e){
        console.log(e);
        
      }
      

    }
  }, [userData, navigate]); // Depend on userData and navigate so the effect runs when either changes

  

  return (
    <div className="flex flex-col gap-5 items-center ">
    <motion.div
      className="home h-full w-full flex justify-start items-start"
      initial={{
        opacity: 0,
        x: 700,
        scale: 1,
        y: 0,
        transition: { duration: 0.53, delay: 1.2 },
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.23, delay: 0.28 },
      }}
      exit={{
        opacity: 0,
        scale: 1,
        x: -100,
        y: 0,
        transition: { duration: 0.25 },
      }}
    >
        <Toaster
         position="bottom-center"
        />
      <div className="flex flex-col gap-3 items-start justify-start w-full">
        <div
          className={`
      
      w-full
      
      flex flex-col gap-3 items-center justify-start`}
        >
          <div
            className="flex flex-col h-fit items-center justify-center w-full"
            style={{
              backgroundColor: "#5D24FF",
              borderRadius: "0px",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              maxWidth: "97%",
            }}
          >
            <motion.div className="flex flex-row gap-4 w-full p-2 items-center justify-between pl-9 pr-9">
              <Logo />

              <CircleHelp size={20} stroke="white" />
            </motion.div>
          </div>




            <div className="flex flex-col h-full w-full items-center justify-between gap-2">

<div className="flex flex-col h-full w-full items-center justify-start gap-2" style={{
    height: "75vh",
   
}} >
   
   <UserProfile userData={
    userDataDecode
   } />
</div>





             
            </div>
          

         
        </div>
      </div>
    </motion.div>
       <NavBar />
      </div>
  );
};

export default Profil;
