const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//投稿を作成する。
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);//インスタンス化している。req.bodyを含んだ新しいデータができる。
    try {
        const savedPost = await newPost.save();//saveする必要がある。
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});


//投稿を更新する
router.put("/:id", async (req, res) => {// /:idはこれから編集する投稿のID
    try {
        const post = await Post.findById(req.params.id);//投稿自体のID  要するにここで特定の投稿を探してpostへ代入している
        if(post.userId === req.body.userId){ ///ここが権限の話
            await post.updateOne({
                $set: req.body,//ここで編集している
            });
            return res.status(200).json("投稿編集に成功しました")
        }
        else{
            return res.status(403).json("あなたは他の人の投稿を編集できません");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});



//投稿を削除する
router.delete("/:id", async (req, res) => {// /:idはこれから編集する投稿のID
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            return res.status(200).json("投稿削除に成功しました")
        }
        else{
            return res.status(403).json("あなたは他の人の投稿を削除できません");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
   
});


//投稿を取得する
router.get("/:id", async (req, res) => {// /:idはこれから編集する投稿のID
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err);
    }
   
});

//特定の投稿にいいねを押す。muzui =>put いいねを押したり押さなかったりするから！！
router.put("/:id/like", async(req, res) => {//自分の投稿にもいいねを押せるようにする
    try {
        const post = await Post.findById(req.params.id);
        //まだ投稿にいいねが押されてない場合いいねが押せる。
        if(!post.likes.includes(req.body.userId)){//要するに投稿のデータの中に自分のuserIdがなかったら、いいね押せるよね？
            await post.updateOne({
                $push: {
                    likes: req.body.userId,//ここで自分のuserIdを配列に挿入している
                },
            });
            return res.status(200).json("投稿にいいねを押しました");
        }
        //投稿に既にいいねを押していた場合
        else{
            //いいねしているuserIdを取り除く
            await post.updateOne({ 
              $pull: {//pullは取り除く
                likes: req.body.userId,
              },
            });
            return res.status(200).json("投稿からいいねを外しました")
        }

    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;






























