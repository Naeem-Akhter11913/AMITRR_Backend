const User = require('../schema/userScham');
const Joi = require('joi');
const bycrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secrete = process.env.SECRETE_KEY

const loginUser = async (req, res) => {

    const {name, email, password } = req.body;
    


    const isValidate = Joi.object({
        name: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
    }).validate(req.body);

    try {

        if (isValidate.error) {
            return res.status(400).send({
                status: false,
                message: isValidate.error.message
            })
        }

        // const isExist = await User.find({email});

        // if(isExist){

        // }else{

        // }
        const isRegister = await User.findOne({ email ,name })

        if (!isRegister) {
            return res.status(400).send({
                status: false,
                message: "Opps... you have no account"
            })
        }

        const isMatched = await bycrypt.compare(password, isRegister.password);



        if (isMatched) {
            
            const token = jwt.sign({ _id: isRegister._id,email , name}, secrete, { expiresIn: '1h' });

            // Set the token as a cookie (you might want to store it securely, e.g., in an HttpOnly cookie)
            res.cookie('authToken', token, { httpOnly: true });

            res.status(200).send({
                success: true,
                message: 'Login successful',
                token
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }


    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}


const registeration = async (req, res) => {
    const { name, password, email } = req.body
    // console.log(name, password, email)
    const isValidate = Joi.object({
        name: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
    }).validate(req.body);

    try {

        if (isValidate.error) {
            return res.status(400).send({
                status: false,
                message: isValidate.error.message
            })
        }
        const isExist = await User.findOne({ email });

        if (isExist) {
            res.status(400).send({
                status: false,
                message: "Email is already exist"
            })
        } else {
            const hashPass = await bycrypt.hash(password, 10);


            const userData = new User({
                name,
                email,
                password: hashPass
            });

            await userData.save();

            res.status(201).send({
                status: true,
                message: "User Register Success"
            });
        }


    } catch (error) {
        res.status(500).send({
            status: false,
            error: error
        })
    }

}

module.exports = { loginUser, registeration }