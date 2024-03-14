import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../ConfigPicash";
import "./FormPartenaire.css";
import exp from "constants";
import CloseIcon from '@mui/icons-material/Close';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import MyForm from "./MyForm";

export const FormPartenaire = ({
                            hideForm,
                            entrepriseName=" ---",
                            entrepriseGroupName="---",
                            entrepriseAdresse="Adresse de l'entreprise"}) => {


const handleHideForm = () => {
  hideForm(false);
}

  return (
    <motion.div
      className="h-full w-full flex flex-col justify-start items-center gap-0 "
      style={{
        maxWidth: "82%",
      }}
      initial={{ opacity: 0, scale: 0.6, y: -40, rotate: 4 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        transition: { duration: 0.23, delay: 1.12 },
      }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.23 }}
    >
      <div className="flex flex-row w-full items-center justify-center" style={{
        maxWidth: "87%",
        marginTop : "8px",
        padding: "5px",
        backgroundColor: "#FFFFFF",
        color: "#5D24FF",
        borderTopLeftRadius: "10px",
        borderTop : "1px solid #5D24FF",
        borderTopRightRadius: "10px",
      }}>
        <p>Selectionner l'entreprise partenaire</p>
      </div>
      <div className="card_motion_formPartenaire w-full">


        <div className="card_form_partenanire flex flex-col gap-3 items-start justify-start w-full m-0 h-full">
          


        <div className="card_form_partenanire_header flex flex-row justify-between items-center w-full">
          <div className="card_form_partenanire_header_item1 flex flex-row justify-between items-center gap-2">
            Resultat du scan
            <AutoModeIcon  style={{
              stroke: "#5D24FF",
              width: "17px",
            }} />
          </div>
          <div onClick={handleHideForm} className="card_form_partenanire_header_close">
            <CloseIcon style={{
              fill: "#FFFFFF",
            }} />
          </div>
        </div>


        {/* FORMULAIRE POUR AJOUTER UN PRODUIT  */ }
        <div className="entreprise_form w-full mt-1 flex flex-col items-center justify-center gap-2">


        <div className="flex flex-row gap-2 w-full items-start justify-start entreprise_card">
          <div className="entreprise_card_logo">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${entrepriseName}`} alt="" srcset="" width="55" style={{borderRadius : "6px"}} />
          </div>
          <div className="flex flex-col gap-1 items-start justify-start entreprise_card_info">
            <p className="entreprise_card_name" >{entrepriseName}</p>
            <p><span className="text-slate-400">Equipe :</span>  {entrepriseGroupName}</p>
          </div>
        </div>


          <MyForm 
          hideForm={hideForm}
          name_compagny={entrepriseName}
          name_groupe={entrepriseGroupName}
          />

        </div>


        </div>
      </div>
    </motion.div>
  );
};

export default FormPartenaire;
