# Ogiri


大喜利の掲示板

# 使った技術

# サーバーサイド
express MongoDB Mongoose
MongoDBには、MongoDBの一意制約 (unique constraint)があり、、同じusernameの値を持つ複数のユーザーを作成しようとすると、エラーが発生する。
認証はできたっぽい

これから
セッションベース認証の実装(完了..多分)、機能の追加

# クライアントサイド
これから
https://elms.u-aizu.ac.jp/login/index.phpこんな感じのpathかも
もうちょっとかんがえるs


# これから
ログインしていない状態だとすぐにログイン画面に戻るという仕様を実装する→＞seessionの有効期限が消えると正式な認証をできない恐れがあるから。





