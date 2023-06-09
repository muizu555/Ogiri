const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");






//register ユーザー登録 /ok
router.post("/register", async(req,res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 12);
        
        const newUser = await new User({
            username: username,
            password: hash,
        });
        const user = await newUser.save();//ここで登録を保存している。documentを見るべし。ここポイント
        req.session.user_id = user._id;  ///ここでユーザーIDをセッションに保存している
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err.message);//500はサーバー関連のerr
    }
});

//login /ok //ログインで重要なことはログインの状態を保つことなのでまだ気合いれよう
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});//mongooseのドキュメントをみろ。
        if(!user) return res.status(404).json("ユーザーが見つかりません");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        //const validPassword = req.body.password === user.password;//req.body.password === user.passwordが成り立てば、trueが返される。前のfindで配列は確定済み
        if(validPassword) {//ここから
            req.session.user_id = user._id;//req.session.user_idは自分で箱を作っている
        }
        

        //二つの条件式を突破できたら、
        return res.status(200).json(user);

    } catch (err) {
        return res.status(500).json(err);
    }
});

// router.get("/secret", (req, res) => {//ログイン状態かどうかを確認するためのcode
//     if(!req.session.user_id){
//         return res.send("ログインされてません");  //本当はこの後にログインページに遷移させたい、もう一回ログインしてみたいな感じで
//     }
//     else{
//         res.send("セッションできてる");
//     }
// }); 




module.exports = router;


//res.status(400).json("パスワードが違います");