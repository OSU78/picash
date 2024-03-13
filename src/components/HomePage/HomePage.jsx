import React from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";

import People from "../../assets/img/People.png";
import s from "./HomePage.module.css";
import { Link } from "react-router-dom";

import sparkle from "../../assets/sparkle.svg";

const HomePage = () => {
  return (
    <motion.div
      className="home h-full h-100svh w-full flex justify-center items-start"
      initial={{
        opacity: 0,
        x: 0,
        scale: 1,
        y: -100,
        transition: { duration: 0.23, },
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.13, delay: 0.36  },
      }}
      exit={{
        opacity: 0,
        scale: 1,
        x: 0,
        y: -100,
        transition: { duration: 0.23 },
      }}
    >
      <div
        className={`
      pt-2
      w-full h-full
      h-90svh
      ${s.card_homePage}
      flex flex-col gap-3 items-center justify-start`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: 0,
            scale: 1,
            y: -10,
            transition: { duration: 0.23, delay: 0.56 },
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: { duration: 0.23, delay: 0.56 },
          }}
          exit={{
            opacity: 0,
            scale: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.23 },
          }}
        >
          <Logo />
        </motion.div>

        <motion.div
        initial={{
            opacity: 0,
            x: 0,
            scale: 1,
            y: -10,
            transition: { duration: 0.23, delay: 0.56 },
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: { duration: 0.23, delay: 0.56 },
          }}
          exit={{
            opacity: 0,
            scale: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.23 },
          }}
        >
          <img
          className={`${s.animation_floating}`}
            src={People}
            alt="profile"
            style={{
              maxHeight: "285px",
              maxWidth: "253px",
            }}
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 0,
            scale: 1,
            y: -10,
            transition: { duration: 0.23,delay: 0.62 },
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: { duration: 0.23, delay: 0.62 },
          }}
          exit={{
            opacity: 0,
            scale: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.23 },
          }}
          className="flex flex-col items-center justify-normal gap-4 w-full h-full"
        >
          <h1 className="text-3xl font-bold text-center">Votre cash..</h1>
          <p
            className="text-center text-slate-300"
            style={{
              fontSize: "1.4rem",
            }}
          >
            En un clic
          </p>
          <div
            style={{
              height: "12.5px",
              width: "17%",
              backgroundColor: "white",
              borderRadius: "50px",
            }}
          ></div>

          <div className="w-full mt-1 mb-4 h-full flex flex-col items-center justify-start md:justify-around ">
            <Link
              to="/register"
              className={`text-xl flex flex-row gap-5 justify-between items-center ${s.btn_picash} ${s.btn_picash_none_bg}`}

            >
              <p>COMMENCER</p>
              <img
                src={sparkle}
                alt="sparkle"
                style={{
                  height: "30px",
                  width: "30px",
                }}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;
