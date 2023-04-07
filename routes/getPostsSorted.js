const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

//まず関数を作る
//人気順
const getPostByLikes = async () => {//データベースをやりとりしている。
    try {
        const posts = await Post.find({}).sort({ "likes.length": -1 });
        return posts;
    } catch (err) {
        console.log(err);
    }
};

//Most recent
const getPostByDate = async () => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
    } catch (err) {
        console.log(err);
    }
}




//人気順
router.get("/sortByLikes", async(req, res) => {
    try {
        const posts = await getPostsByLikes();
        return res.status(200).json(posts);
    }
    catch(err){
        return res.status(500).json("Server Error");
    }
});

//Most recent
router.get("/sortByLate", async(req, res) => {
    try {
        const posts = await getPostByDate();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json("Server Error");
    }
})


module.exports = router;