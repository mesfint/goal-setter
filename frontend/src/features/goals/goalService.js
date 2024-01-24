//This file is strictly for fetching/http request data from rest api and save data in LS
import axios from "axios";
//import goalSlice from "./goalSlice";

const API_URL = "/api/goals/";

//Create goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  //   if (response.data) {
  //     localStorage.setItem("goal", JSON.stringify(response.data));
  //   }
  return response.data;
};

//get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  //   if (response.data) {
  //     localStorage.setItem("goal", JSON.stringify(response.data));
  //   }
  return response.data;
};

//Delete user goal

const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + goalId, config);

  //   if (response.data) {
  //     localStorage.setItem("goal", JSON.stringify(response.data));
  //   }
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
