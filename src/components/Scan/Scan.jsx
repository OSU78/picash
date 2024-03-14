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
import NavBar from "../NavBar/NavBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCookie, getCookie } from "../../ConfigPicash.jsx";
import { AnimatePresence } from "framer-motion";
import { QrReader } from "../QrReader/QrReader.tsx";
const Scan = () => {
  const navigate = useNavigate();

  const userData = getCookie("jwt_token_picash")
    ? getCookie("jwt_token_picash")
    : null;
  const [userDataDecode, setUserDataDecode] = useState(null);
  useEffect(() => {
    console.log("userData : ", userData);
    // Check if userData is not present and redirect to "/" if true
    if (!userData) {
      navigate("/");
    } else {
      try {
        setUserDataDecode(jwtDecode(userData));
      } catch (e) {
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
          x: 0,
          scale: 1,
          y: 0,
          transition: { duration: 0.15, delay: 1.2 },
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.15, delay: 0.28 },
        }}
        exit={{
          opacity: 0,
          scale: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.25 },
        }}
      >
        <Toaster position="bottom-center" />
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
                position: "fixed",
                top: 0,
                zIndex: 1000,
              }}
            >
              <motion.div className="flex flex-row gap-4 w-full p-2 items-center justify-between pl-9 pr-9">
                <Logo />

                <CircleHelp size={20} stroke="white" />
              </motion.div>
            </div>

            <div className="flex flex-col h-full w-full items-center justify-between gap-2">
              <div
                className="flex flex-col h-full w-full items-center justify-start gap-2"
                style={{
                  height: "75vh",
                }}
              >
                <AnimatePresence>
                <QrReader />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div  style={{
        background:"#ffffff2e",
        marginTop : '65px',
        zIndex: "5555",
        padding: "5px",
    borderRadius: "8px",
    backdropFilter: "blur(6px)",
    border: "1px solid #ffffff3b",
      }}>
        <NavBar iconwhite={true} />
      </div>
    </div>
  );
};

export default Scan;
