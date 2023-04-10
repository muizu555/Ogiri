const express = require("express");
const app = express();


const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const boardRoute = require("./routes/board");
const sortPostRoute = require("./routes/getPostsSorted");

const session = require("express-session");
const bcrypt = require("bcrypt");


// const hashPassword = async (pw) => {
//     const hash = await bcrypt.hash(pw, 12);//ここでは、すでにsaltもしてくれている。12=>saltRounds
//     console.log(hash);
// }
//hashPassword("12345");


// const login = async (pw, hashedPw) =>{
//     const result = await bcrypt.compare(pw, hashedPw);//return true
//     if(result) console.log("ログイン完了");
//     else console.log("ログイン失敗");
// }

// login("12345","$2b$12$PZ89KBHX40lGKPycNs9si.5b/ikUCj79m5CMnhkPyBg.WguyV2hKe");

const connectDB = require("./db/connect");
require("dotenv").config();

//pathを指定しなければ全てで機能する
app.use(express.json());
app.use(express.static("./public"));


const sessionOption = {//resaveのエラーを消した
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,//way to save session
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*7,
    }
};

app.use(session( sessionOption ));//これにより、reqestobにsessionというプロパティが用意される //ココが重要！！　このミドルウェアでsessionIdがresでかえる//本当は環境変数とかでべた書きにしないようにする。//本当はsecret以外にも色々とプロパティを作るべし。



app.get("/viewcount", (req, res) => {//req.sessionはただの入れ物 ここをポートフォリを作るときに取り入れたい 1回expressを止めちゃうとサーバサイドに保存しているので０になる
    if(req.session.count){//countは勝手に作った
        req.session.count += 1;
    }
    else{
        req.session.count = 1;
    }
    res.send(`あなたは${req.session.count}回このページを見ました。`)
});





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