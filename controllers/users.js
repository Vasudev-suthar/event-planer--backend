// import the express Router
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/User");


const userController = {
    register: async (req, res) => {
        try {
            const { fullname, username, emailId, mobileNo, password } = req.body;

            const existingUserEmail = await User.findOne({ emailId });
            const existingUserName = await User.findOne({ username });

            if (existingUserEmail) {
                return res.status(409).json({ message: "Email already exists" })
            }
            else if (existingUserName) {
                return res.status(409).json({ message: "Username Not available" })
            }
            else {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const user = new User({
                    fullname,
                    username,
                    emailId,
                    mobileNo,
                    password: hashedPassword
                })

                const savedUser = await user.save()
                // res.send({ "message": "Successful Registeration", token: token })
                res.status(201).json({ message: 'Successful Registeration', user: savedUser });


            }

        } catch (error) {
            res.status(504).json({ message: "Internal server Error" });
        }
    },
    login: async (req, res) => {
        try {
            const { data, password } = req.body;

            const user = await User.findOne({ emailId: data }) || await User.findOne({ username: data });

            if (!user) {
                res.status(400).send({ message: "Invalid Credentials" })
            }
            else {
                const storedPassword = user.password;
                const isPasswordMatch = await bcrypt.compare(password, storedPassword)
                if (isPasswordMatch) {
                    const token = jwt.sign({ id: user.userId }, config.SECRET_KEY)
                    res.header({ "x-auth-token": token })
                    res.send({ "message": "Successful Login", token, user })
                }
                else {
                    res.send({ message: "Invalid Credentials" })
                }
            }


        } catch (error) {
            console.error("Error signing In")
            res.status(500).json({ message: "Internal Server Error" })
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id)
            res.status(200).json({ user })
        } catch (error) {
            res.status(400).json({ message: "Server Error", error })
        }
    },
    editUser: (request, response) => {
        const id = request.params.id;
        const userToPatch = request.body;

        User.findByIdAndUpdate(id, userToPatch)
            .then((updateduser) => {
                if (!updateduser) {
                    return response.status(404).json({ error: 'user not found' });
                }
                response.status(201).json({ "message": "Update Successful", updateduser });
            })
            .catch((error) => {
                response.status(500).json({ error: 'Internal server error' });
            });
    },
    getAllUser: async (req, res) => {
        try {
            User.find({})
                .then((users) => {
                    res.status(200).json({ users: users })
                })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}




module.exports = userController;