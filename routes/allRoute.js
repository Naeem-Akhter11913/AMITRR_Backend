const express = require("express");
const { allStudentScore, saveStudentScore, getAll } = require("../controllers/AllCorntrollers");

const Allroutes = express.Router();

Allroutes.get('/score',allStudentScore);
Allroutes.post('/saveScore',saveStudentScore);
// Allroutes.get('/allScore/:id/:email',getAll);
Allroutes.get('/allScore',getAll);

module.exports = Allroutes