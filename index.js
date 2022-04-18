require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware")

const PORT = process.env.PORT || config.get("serverPort");

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL || config.get("clientUrl")
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.status(200).json({message: "WORKING!"})
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || config.get("mongoUri"), {})
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}

void start();