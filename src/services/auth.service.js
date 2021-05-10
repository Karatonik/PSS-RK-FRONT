import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  login(name, password) {
    return axios
      .post(API_URL + "signin", {
        name,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("status", JSON.stringify(response.data.status));
          localStorage.setItem("id", JSON.stringify(response.data.id));
         
        }
        console.log(response)
        return response.data;
      });
  }
  
  logout() {
    localStorage.removeItem("user");
  }
 
 
  register(name, email , password,companyName,companyAddress,companyNip,lastName) {
    return axios.post(API_URL + "signup", {
      name ,
      email,
      password,
      companyName,
      companyAddress,
      companyNip,
      lastName
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')) ;
   
  }
  getCurrentStatus() {
    return JSON.parse(localStorage.getItem('status')) ;
   
  }
}

export default new AuthService();
