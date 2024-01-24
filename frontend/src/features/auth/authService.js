//This file is strictly for fetching/http request data from rest api and save data in LS
import axios from "axios";
import authSlice from "./authSlice";

const API_URL = "/api/users/";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData); //API_URL/login

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout, // Make sure to export the logout function
  login,
};

export default authService;
