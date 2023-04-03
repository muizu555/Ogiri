const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");



const connectDB = require("./db/connect");
require("dotenv").config();


app.use(express.json());
app.use(express.static("./public"));
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


const PORT = 8080;



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log("server runnning");
        });
    } catch (err) {
        console.log(err);
    }
};

start();