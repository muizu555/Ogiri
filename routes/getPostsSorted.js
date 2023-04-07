const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

//まず関数を作る　　//ここ激ムズ MongooseのDocumentもっと見る likesが配列だったので、うまくソートできなかったっぽい,_idも一緒に入れ替えてるっぽい  あってる？
// //人気順
 const getPostsByLikes = async () => {
     try {
      const posts = await Post.find({}).sort({likes: -1, _id: -1})
      return posts;
     } catch (err) {
       console.log(err);
     }
   };
  
  router.get("/byLikes", async(req, res) => {
    try {
      const posts = await getPostsByLikes();
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json("Server Error");
    }
  });  

// //Most recent
 const getPostByDate = async () => {
     try {
         const posts = await Post.find({}).sort({ createdAt: -1 });
         return posts;
     } catch (err) {
         console.log(err);
    }
 }





 //Most recent
 router.get("/byDate", async(req, res) => {
     try {
         const posts = await getPostByDate();
         return res.status(200).json(posts);
     } catch (err) {
         return res.status(500).json("Server Error");
     }
 })


module.exports = router;





// const getPostsByLikes = async () => {//ここ激ムズ MongooseのDocumentもっと見る likesが配列だったので、うまくソートできなかったっぽい
//     try {
//       const posts = await Post.aggregate([
//         {
//           $sort: { likes: -1, _id: -1 } // likes の配列の長さで降順ソートし、_id で降順に並べ替える
//         },
//       ]);
//       return posts;
//     } catch (err) {
//       console.log(err);
//     }
//   };