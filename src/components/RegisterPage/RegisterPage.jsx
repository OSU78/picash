import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";
import { CircleHelp } from "lucide-react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Button } from "@mui/material";
import s from "./RegisterPage.module.css";
import HandRegister from "../../assets/img/HandRegister.png";
import { toast, Toaster } from 'react-hot-toast'; // Assurez-vous que c'est le bon import pour votre toaster
import APIClient from "../../API/API"; // Mettez à jour le chemin selon l'emplacement de votre fichier APIClient
import { useDispatch } from "react-redux";
import { defineUSERDATA } from "../../stores/AUTH/authSlice";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispath = useDispatch();
 
  // Fonction pour gérer l'inscription
  const handleRegister = async () => {
    try {
      const response = await APIClient.createUser(password, email, name);
      console.log(response);
      toast.success("Inscription réussie!"); 

      dispath(defineUSERDATA(response)); // Enregistre les données de l'utilisateur dans le store
      setTimeout(() =>{toast.success("Redirection dans 1 seconde ..")}, 1000); // Rediriger vers /scan après 2 secondes
      setTimeout(() => navigate("/scan"), 2000); // Rediriger vers /scan après 2 secondes
    } catch (error) {
      console.error(error); // Affiche l'erreur dans la console si l'appel échoue
      toast.error("L'inscription a échoué."); // Affiche un message d'erreur
    }
  };

  return (
    <motion.div
      className="home h-full w-full flex justify-start items-start "
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
      <Toaster />
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
              Vous ête nouveau ?
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                className="w-full"
                style={{
                  maxWidth: "300px",

                  borderRadius: "10px",
                }}
                id="outlined-basic"
                label="Renseinger votre Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                password={password}
                handlePassword={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="w-full mt-1 mb-4 h-full flex flex-col items-center justify-start md:justify-around ">
              <div
                onClick={handleRegister}
                className={`text-xl flex flex-row gap-5 justify-center items-center ${s.btn_picash} ${s.btn_picash_none_bg}`}
              >
                <p>S'inscrire</p>
              </div>
              <p className="flex flex-col items-center justify-center text-slate-400 mt-2">
                {" "}
                <span>Vous ête nouveau ? </span>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Connecter vous ici !{" "}
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
