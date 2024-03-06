const express = require("express");
const { loginUser, registeration } = require("../controllers/user");
const routes = express.Router();


routes.post('/user/login', loginUser);
routes.post('/user/registeration', registeration);


module.exports = routes