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
        console.log("define REFRESH USERDATA en cours...")
        if (state.userData) {
          state.userData = action.payload; // Mettez à jour directement avec le crédit récupéré
        }
      },


    
    // 💾 Stocke le JWT dans sessionStorage et met à jour les données utilisateur.
    storeJWT: (state, action) => {
      const token = action.payload;
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        sessionStorage.setItem("jwt_token_picash", token);
        setCookie("jwt_token_picash", token, 2);
        localStorage.setItem("jwt_token_picash", token);


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
      let jwtToken = sessionStorage.getItem("jwt_token_picash") ? sessionStorage.getItem("jwt_token_picash") : getCookie("jwt_token_picash");
      if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        if (decodedToken && state.userData === null) {
          state.userData = decodedToken;
        }
      }
    },
  },

});

export const {storeJWT, getJWT, removeJWT,defineUSERDATA } = authSlice.actions;

export default authSlice.reducer;