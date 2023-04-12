const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Board = require("../models/Board");
const ObjectId = require('mongodb').ObjectId;//objectId問題他に解決策を見つけたい


// //投稿を作成する。//まさかのここでお題への挿入をするの？
// router.post("/", async (req, res) => {
//     const newPost = new Post(req.body);//インスタンス化している。req.bodyを含んだ新しいデータができる。
//     try {
//         const savedPost = await newPost.save();//saveする必要がある。->インスタンス化で作っているから。createならいらないかも＞document見ろ
//         return res.status(200).json(savedPost);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });
//               | 下の方が正しい？   また、解答はpostだが、boardの配列へ格納するので、putメソッドなのでは？
//
router.post("/:id", async (req, res) => {//:idはboardのobjectID　どのお題に対する解答かが重要だから。//ok
    const newPost = new Post(req.body);
    try {//特にお題の解答の場合に権限をどうするかは、考えなくて良いはず。
        const board = await Board.findById(req.params.id);//ここでどのboardに格納すべきかを探している.
        await board.updateOne({
            $push: {
                num_answer: newPost._id,//投稿のobjectIdを挿入している。
            },
        });
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//ここでセッションがなかったら。res.redirectでログイン画面へ遷移させるようなミドルウェアを作ろう。もしいきなり編集の画面からアプリを立ち上げた時のため
const isSession = async (req, res, next) => {
    if(!req.session.user_id){
        return res.redirect() //ここがres.redirect()の使い方がよくわからん 本当はここから同じ階層のpublicのlogin.jsへ遷移させたい
    }
    else{
        return next();
    }
}
//このミドルウェアを認証が必要な処理にかませれば、良さそう。（注）ここはセッションを保持しているかの確認で、誰なのかの認証ではなく、認可に近いかも！！
 //sessionという入館証をuserが持っていて通すみたいな感じだから。 持ってなかったらログイン画面に戻って発行してきてね、みたいな話


router.put("/:id", async (req, res) => {// /:idはこれから編集する投稿のID //認可  //ok
        try {
             const post = await Post.findById(req.params.id);//投稿自体のID  要するにここで特定の投稿を探してpostへ代入している
             if(post.userId === req.session.user_id){ ///ここが権限の話　//ここでセッションIDを用いたい
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




// //投稿を更新する
// router.put("/:id", async (req, res) => {// /:idはこれから編集する投稿のID //認可
//     try {
//         const post = await Post.findById(req.params.id);//投稿自体のID  要するにここで特定の投稿を探してpostへ代入している
//         if(post.userId === req.body.userId){ ///ここが権限の話　//ここでセッションIDを用いたい
//             await post.updateOne({
//                 $set: req.body,//ここで編集している
//             });
//             return res.status(200).json("投稿編集に成功しました")
//         }
//         else{
//             return res.status(403).json("あなたは他の人の投稿を編集できません");
//         }
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });



//投稿を削除する  ここで配列の中から削除するのが、難しい
router.delete("/:id", async (req, res) => {// /:idはこれから編集する投稿のID  //ここをしっかり
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.session.user_id){
            //ここが難しい。
            const boards = await Board.find({});
            const deleteTargetBoards =  boards.filter((board) => 
                (board.num_answer.includes(req.params.id))
            );
            console.log(deleteTargetBoards);//見つけた

            await deleteTargetBoards[0].updateOne({
                $pull: {//pullは取り除く
                    num_answer: new ObjectId(req.params.id),//ここで作っている。
                  },
            })
            await post.deleteOne();
            return res.status(200).json("投稿削除に成功しました")
        }
        else{
            return res.status(403).json("あなたは他の人の投稿を削除できません");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
   
});


//投稿を取得する
router.get("/:id", async (req, res) => {// /:idはこれから編集する投稿のID これは、誰でも見れるようにs
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err);
    } 
});

//特定の投稿にいいねを押す。muzui =>put いいねを押したり押さなかったりするから！！  //ここは、別にいらない
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






























