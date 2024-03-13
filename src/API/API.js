

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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as needed
          'Authorization': `Bearer ${sessionStorage.getItem("jwt_token_picash") || ""}`,
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        // If the response is not 2xx, throw an error
        const errorData = await response.text(); // Using text() as we don't know the exact structure of the error response
        throw new Error(`Error ${response.status}: ${errorData}`);
      }

      const data = await response.json();
      console.log("Authentication successful:", data);
      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }



  static async createUser(password, email, nameOrganisation) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/newUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as needed
          'Authorization': `Bearer ${sessionStorage.getItem("jwt_token_picash") || ""}`,
        },
        body: JSON.stringify({
          password: password,
          email: email,
          name_organisation: nameOrganisation
        }),
      });

      if (!response.ok) {
        // If the response is not 2xx, throw an error
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();
      console.log("User creation successful:", data);
      return data;
    } catch (error) {
      console.error("User creation error:", error);
      throw error;
    }
  }




  static async getClientHistory(token, email) {
    try {
      const response = await fetch(`${API_BASE_URL}/client/history?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: apiOptions.headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Client history retrieval successful:", data);
      return data;
    } catch (error) {
      console.error("Error retrieving client history:", error);
      throw error;
    }
  }

  static async getClientAccount(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/client/account`, {
        method: 'POST',
        headers: apiOptions.headers,
        body: JSON.stringify({
          name_compagny: "Google",
          name_groupe: "dev_team",
          token: token // Ensure the token is valid and correctly passed
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Client account details retrieval successful:", data);
      return data;
    } catch (error) {
      console.error("Error retrieving client account details:", error);
      throw error;
    }
  }

  static async transfer(token, spend, emailPartenaire, productName) {
    try {
      const response = await fetch(`${API_BASE_URL}/client/transfer`, {
        method: 'POST',
        headers: apiOptions.headers,
        body: JSON.stringify({ token, spend, email_partenaire: emailPartenaire, product_name: productName })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transfer successful:", data);
      return data;
    } catch (error) {
      console.error("Transfer error:", error);
      throw error;
    }
  }

  






}

export default API;
