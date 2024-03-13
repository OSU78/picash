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
import s from "./LoginPage.module.css";
import { storeJWT } from "../../stores/AUTH/authSlice";



//COnfig Zod 
import { z } from 'zod';
import { useDispatch } from "react-redux";
import { defineUSERDATA } from "../../stores/AUTH/authSlice";
import { jwtDecode } from 'jwt-decode';
const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }).nonempty({ message: "L'email ne peut pas être vide" }),
  password: z.string().min(1, { message: "Le mot de passe ne peut pas être vide" }),
});


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


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
    
    // Assuming the token is in the response.Token property.
    const jwtTokens = response.Token; 
    if (jwtTokens) {
      const detoken =  jwtDecode(jwtTokens);
      toast.success("Connexion réussie !",detoken);
     
      console.log(detoken);
      // Dispatch the actions with the token
      dispatch(defineUSERDATA(detoken)); // Enregistre les données JWT décodées dans le store
      dispatch(storeJWT(jwtTokens)); // Enregistre le JWT dans le sessionStorage et le cookie
      
      setTimeout(() => {
       
        navigate("/scan");
      }, 1000); // Rediriger vers /scan après 1 seconde
    } else {
      throw new Error("Token not found in response.");
    }
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
              maxWidth: "97%",
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
                label="Renseinger votre email"
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
                onClick={handleLogin}
                className={`text-xl flex flex-row gap-5 justify-center items-center ${s.btn_picash} ${s.btn_picash_none_bg}`}
              >
                <p>Se connecter</p>
              </div>
              <p className="flex flex-col items-center justify-center text-slate-400 mt-2">
                {" "}
                <span>Vous avez déjà un compte ? </span>
                <Link
                  to="/register"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  S'inscrire ici !{" "}
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
