import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import { set } from 'react-hook-form';
import { setCookie, getCookie } from '../../ConfigPicash.jsx';






const initialState = {
  userUUID: null, // 🆔 Stocke l'identifiant UUID de l'utilisateur.
  isRegistered: false, // 📝 Indique si l'utilisateur est enregistré ou non.
  userData: null, // 👤 Contient les données décodées du JWT pour l'utilisateur connecté.
  isAuthenticated: true, // 🔐 Suit si l'utilisateur est authentifié ou non.
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer to define user DATA
      defineUSERDATA: (state, action) => {
        const token = action.payload;
        // Ensure the token is valid and can be decoded.
        try {
          const decodedToken = (token); // Use jwt_decode instead of jwtDecode
          console.log("Decoded token:", decodedToken);
          state.userData = decodedToken; // Store the decoded token data
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      },


    
    // 💾 Stocke le JWT dans sessionStorage et met à jour les données utilisateur.
    storeJWT: (state, action) => {
      const token = action.payload;
      const decodedToken = (token);
      if (decodedToken) {

        
        sessionStorage.setItem("jwt_token_picash", token);
        setCookie("jwt_token_picash", token, 2);
        localStorage.setItem("jwt_token_picash", token);
        console.log("storeJWT en cours : ->",decodedToken)

        state.userData = decodedToken;
        state.isAuthenticated = true;
      }
    },
  
    // ❌ Supprime le JWT de sessionStorage et réinitialise les données utilisateur.
    removeJWT: (state) => {
      sessionStorage.removeItem("jwt_token_picash");
      localStorage.removeItem("jwt_token_picash");
      setCookie("jwt_token_picash", "", 0);
      state.userData = null;
      state.isAuthenticated = false;
    },
    // 📥 Récupère et décode le JWT de sessionStorage s'il existe.
    getJWT: (state) => {
      let jwtToken = sessionStorage.getItem("jwt_token_picash") || getCookie("jwt_token_picash");
      if (jwtToken) {
        try {
          // Decode the token
          const decodedToken = jwtDecode(jwtToken);
          console.log("Decoded token:", decodedToken);

          // Update the state with the decoded token data
          state.userData = decodedToken;
          state.isAuthenticated = true; // Set authentication to true
        } catch (error) {
          console.error("Error decoding token:", error);
          // Handle decoding errors (e.g., token is invalid)
          state.userData = null;
          state.isAuthenticated = false;
          
        }
      } else {
        // No token found
        state.userData = null;
        state.isAuthenticated = false
      
      }
      }
  },

});

export const {storeJWT, getJWT, removeJWT,defineUSERDATA } = authSlice.actions;

export default authSlice.reducer;