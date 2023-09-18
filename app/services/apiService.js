// import axios from "axios";
const axios = require("axios");

const url = "http://localhost:3000/";

const registerService = async (person) => {
  console.log(person);
  console.log(url + "register");
  // return axios.post(url + "register", person).;
};
registerService({
  name: "mohamed",
  email: "dmakl@gmail.com",
  password: "12345678",
});
