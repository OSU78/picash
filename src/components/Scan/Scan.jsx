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
import s from "./Scan.module.css";





const Scan = () => {
  
  const navigate = useNavigate();


  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    // Empêcher la soumission si les champs ne sont pas valides
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      // Afficher les messages d'erreur de validation
      toast.error(result.error.errors.map((err) => err.message).join(", "));
      return;
    }
  
    try {
      const response = await APIClient.authenticateUser(email, password);
      console.log(response); // Afficher la réponse dans la console
      toast.success("Connexion réussie !");
      setTimeout(() =>{toast.success("Redirection dans 1 seconde ..")}, 1000); // Rediriger vers /scan après 2 secondes
      setTimeout(() => navigate("/scan"), 2000); // Rediriger vers /scan après 2 secondes
    } catch (error) {
      console.error(error);
      toast.error("La connexion a échoué.");
    }
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
        <Toaster
         position="bottom-center"
        />
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





          Scan Page

         
        </div>
      </div>
    </motion.div>
  );
};

export default Scan;
