const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {//内容
        type: String,
        max: 200,
    },
    img:{//画像を使ってもいいように
        type: String,//画像のpathを指定するから
    },
    likes: {
        type: Array,//誰がいいねを押したのかを格納する配列 この中にはいいねを押した人のuserIdが記録されていく。
        default: [],
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);