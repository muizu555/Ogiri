const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: Array,//フォロワーは増えていく可能性があるから。
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {//権限があるかどうか=>認証済みかどうか(ログインの話)
        type: Boolean,
        default: false,
    },
    desc: {//description 概要欄みたいなもの 仮にプロフィールページみたいなのを作った場合
        type: String,
        max: 70,
    },
},

  {timestamps: true }//データを格納した日付と時間を自動的に格納することができる。
);

module.exports = mongoose.model("User", UserSchema);

