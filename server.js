require("dotenv").config()

console.log(process.env.MONGO_URI)


const express = require("express")
const connectDB = require("./config/db")

const app = express()

connectDB()

const authRoutes = require("./routes/auth")

app.use(express.json())

app.get("/" , (req,res) => {
    res.send("Authentication API Running")
})

app.use("/auth" , authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
}) 