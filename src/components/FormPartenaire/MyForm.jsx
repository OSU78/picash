import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import API from "../../API/API"; // Assurez-vous que le chemin vers APIClient est correct
import "./FormPartenaire.css";
import SavingsIcon from '@mui/icons-material/Savings';
import { toast } from 'react-hot-toast'; // Assurez-vous que react-hot-toast est installé
import { getCookie } from '../../ConfigPicash';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { set } from 'react-hook-form';

const MyForm = ({hideForm,name_compagny,name_groupe}) => {
  // État local pour les données du formulaire
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');






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







  // Gérer la soumission du formulaire
  const handleFormPartenaire = async (e) => {
    e.preventDefault();

    // Récupérez le jeton d'authentification
    const token = userData;


    // Assurez-vous que toutes les valeurs sont présentes
    if (!token || !product || !quantity || !price) {
        console.log("Les champs non Renseinger sont : ",token,product,quantity,price)
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    // Convertissez la quantité et le prix en nombres
    const spend = Number(quantity) * Number(price);

    // Appeler l'API pour effectuer le transfert
    try {
      const response = await API.transfer(token, spend, userDataDecode?.username, product,name_compagny , name_groupe );
      console.log("Transfer successful:", response);
      toast.success("Paiement réussi !");
      setTimeout(() => {
        hideForm(false);
      }, 1000);
      // Réinitialisez le formulaire ou naviguez vers une autre page si nécessaire
      setProduct('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error("Transfer error:", error);
      toast.error("Le paiement a échoué.");
    }
  };
  return (
    <form action="" onSubmit={handleFormPartenaire} className="custom_form flex flex-col gap-3 items-start justify-start w-full p-4">
      <div className="flex flex-col gap-4 items-start justify-start w-full">
      <TextField
        fullWidth
        id="produit"
        label="Nom du produit"
        variant="outlined"
        placeholder="Nom du produit"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="bg-transparent"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        type="number"
        id="quantite"
        label="Quantité du produit"
        variant="outlined"
        placeholder="Quantité"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="bg-transparent"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        type="number"
        id="prix"
        label="Prix du produit"
        variant="outlined"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="bg-transparent"
        InputProps={{
          startAdornment: <p className="mr-2">€</p> // For currency symbol
        }}
        InputLabelProps={{ shrink: true }}
      />
      </div>
      <div className="flex flex-row gap-2 items-center justify-center w-full custom_form_btn_section">
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white btn_color h-12 custom_form_btn" // Tailwind classes for styling
        >
          PAYER
          <SavingsIcon className="ml-2" />
        </Button>
       
      </div>
    </form>
  );
};

export default MyForm;
