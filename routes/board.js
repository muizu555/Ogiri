const express = require("express");
const router = express.Router();
const Board = require("../models/Board");


//お題の作成  最終的には、ある権限を持っている人のみが作成できるようにする。
router.post("/", async(req, res) => {
    const newBoard = new Board(req.body);
    try {
        const savedBoard = await newBoard.save(); //awaitの書く場所？
        return res.status(200).json(savedBoard);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//お題の編集
router.put("/:id", async (req, res) => {// /:idはこれから編集するお題のID
    try {
        const board = await Board.findById(req.params.id);//お題自体のID  要するにここで特定のお題を探してboardへ代入している
        if(board.userId === req.body.userId){ ///ここが権限の話
            await board.updateOne({
                $set: req.body,//ここで編集している
            });
            return res.status(200).json("お題編集に成功しました")
        }
        else{
            return res.status(403).json("あなたには権限がありません");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});


//お題の削除する
router.delete("/:id", async (req, res) => {// /:idはこれから編集する投稿のID
    try {
        const board = await Board.findById(req.params.id);
        if(board.userId === req.body.userId){
            await board.deleteOne();
            return res.status(200).json("お題の削除に成功しました")
        }
        else{
            return res.status(403).json("あなたには権限がありません");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
   
});

//特定のお題を取得する
router.get("/:id", async (req, res) => {// /:idはこれから編集する投稿のID これは、誰でも見れるようにs
    try {
        const board = await Board.findById(req.params.id);
        return res.status(200).json(board)
    } catch (err) {
        return res.status(500).json(err);
    }
   
});


module.exports = router;