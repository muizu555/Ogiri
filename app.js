const express = require("express");
const app = express();


const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const boardRoute = require("./routes/board");
const sortPostRoute = require("./routes/getPostsSortedByLikes");



const connectDB = require("./db/connect");
require("dotenv").config();


app.use(express.json());
app.use(express.static("./public"));
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/boards", boardRoute);
app.use("/api/sortPosts", sortPostRoute);


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