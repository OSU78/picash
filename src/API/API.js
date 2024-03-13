import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://162.19.65.178:8080'; // L'URL de base de l'API.

let apiOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Cors': 'no-cors',
    'Authorization': `Bearer ${sessionStorage.getItem("jwt_token_picash") || ""}`,
  },
};



class API {
  static async authenticateUser(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { username: email, password }, apiOptions);
      console.log("Authentication successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }

  static async createUser(password, email, nameOrganisation) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/newUser`, { password, email, name_organisation: nameOrganisation }, apiOptions);
      console.log("User creation successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("User creation error:", error);
      throw error;
    }
  }

  static async getClientHistory(token, email) {
    try {
      const response = await axios.get(`${API_BASE_URL}/client/history`, { ...apiOptions, params: { token, email } });
      console.log("Client history retrieval successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving client history:", error);
      throw error;
    }
  }

  static async getClientAccount(token) {
    try {
      const response = await axios.get(`${API_BASE_URL}/client/account`, { ...apiOptions, params: { token } });
      console.log("Client account details retrieval successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving client account details:", error);
      throw error;
    }
  }

  static async transfer(token, spend, emailPartenaire, productName) {
    try {
      const response = await axios.post(`${API_BASE_URL}/client/transfer`, { token, spend, email_partenaire: emailPartenaire, product_name: productName }, apiOptions);
      console.log("Transfer successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Transfer error:", error);
      throw error;
    }
  }
}

export default API;
