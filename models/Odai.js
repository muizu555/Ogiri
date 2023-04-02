const mongoose = require("mongoose");

const OdaiSchema = new mongoose.Schema({
    userId: {//作った人このお題を
        type: String,
        required: true,
    },
    title: {//お題
        type: String,
        max: 100,
    },
    img:{//一応写真で一言対策に
        type: String,//画像のpathを指定するから
    },
    num_answer: {//答えた投稿の数
        type: Array,//投稿自体のobject_idを貯めていく
        default: [],
    },
    king_answer: {//最優秀賞　お題を作った人しか評価できないようにする。
        type: String,
    }
},
{timestamps: true }//データを格納した日付と時間を自動的に格納することができる。

);

module.exports = mongoose.model("Odai", OdaiSchema);