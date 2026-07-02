const User = require("../models/User")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {

    const { name, email, password } = req.body

    try {

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        })

    }
}



const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        return res.status(200).json({
            message: "Login Successful"
        })

    } catch (error) {

        return res.status(500).json({
            message: "Server Error"
        })

    }
}

module.exports = {
    registerUser,
    loginUser
}