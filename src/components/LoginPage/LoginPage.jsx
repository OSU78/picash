import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import HandRegister from "../../assets/img/HandRegister.png";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Button } from "@mui/material";
import s from "./LoginPage.module.css";

import { Toaster, toast } from 'sonner'


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
        transition: { duration: 0.23, delay: 0.2 },
      }}
      exit={{
        opacity: 0,
        scale: 1,
        x: -100,
        y: 0,
        transition: { duration: 0.25 },
      }}
    >
      <div className="flex flex-col gap-3 items-start justify-start h-100svh w-full">
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
            }}
          >
            <motion.div className="flex flex-row gap-4 w-full p-2 items-center justify-between pl-9 pr-9">
              <Logo />

              <CircleHelp size={20} stroke="white" />
            </motion.div>
          </div>

          <div className="flex flex-col gap-1 items-center justify-start pt-1 w-full h-full">
            <img src={HandRegister} alt="" srcset="" width={100} />

            <h1
              className="text-3xl"
              style={{
                color: "#5D24FF",
              }}
            >
              Connexion
            </h1>
            <hr className="custom_hr" />
            <div className="flex flex-col gap-5 items-center justify-start pt-1 w-full h-full">

           
            <TextField
              className="w-full"
              style={{
                maxWidth: "300px",

                borderRadius: "10px",
              }}
              id="outlined-basic"
              label="Renseinger votre nom"
              variant="outlined"
            />

          

            <PasswordInput
              password={password}
              handlePassword={(e) => setPassword(e.target.value)}
            />
             </div>

            <div className="w-full mt-1 mb-4 h-full flex flex-col items-center justify-start md:justify-around ">

              <div
                className={`text-xl flex flex-row gap-5 justify-center items-center ${s.btn_picash} ${s.btn_picash_none_bg}`}
              >
                <p>Se connecter</p>
             
              </div>
              <p className="flex flex-col items-center justify-center text-slate-400 mt-2" > <span>Vous avez déjà un compte ? </span>  
              <Link
              to="/register"
              style={{
                textDecoration : "underline"

              }}>S'inscrire ici ! </Link>  </p>
            </div>








          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
