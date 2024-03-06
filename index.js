const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require("./routes/userRoute");
const Allroutes = require("./routes/allRoute");


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
require('./config/db')

app.use('/api',routes);
app.use('/api/stud/',Allroutes)
app.listen(8001, ()=>{
    console.log("server is running at port 8000");
})