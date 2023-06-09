const boardsDOM = document.querySelector(".thread-section");
//console.log(boardsDOM);

const submitDOM = document.querySelector(".btn submit-btn");
const contentDOM = document.querySelector(".content-input");


const showBoards = async () => {
    try {
        const { data: boards } = await axios.get("/api/boards");

        //console.log(boards);

        const allBoards = boards.map((board) => {//Array.map
            
            const { title, _id, userId } = board;
            //console.log(title);


            //userIdのことも考えなくては
            return `
            <div class="single-thread">
                <div class="task-links">
                    <!--編集リンク-->
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <!--ゴミ箱リンク-->
                    <button type="button" class="delete-btn" data-id = "${_id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <!--いいねリンク-->
                    <button type="button" class="like-btn" data-id = "${_id}">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                </div>
                <p>${title}</p>
            </div>`;
        }).join("");
        //console.log(allBoards);

        boardsDOM.innerHTML = allBoards;

    } catch (err) {
        console.log(err);
    }

}

showBoards();


function getSessionIdFromCookie() {
    const cookies = document.cookie.split(";"); // Cookieをセミコロンで分割して配列に格納
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // クッキーの前後のスペースを削除
  
      // クッキーがセッションIDを含んでいる場合は取得して返す
      if (cookie.startsWith("sessionId=")) {
        return cookie.substring("sessionId=".length, cookie.length);
      }
    }
  
    return null; // セッションIDが見つからない場合はnullを返す
  }

submitDOM.addEventListener("submit", async (event) =>{
    alert("こんにちは");
    event.preventDefault();

    const title = contentDOM.value;
    console.log(title);
    try {
        const userId = getSessionIdFromCookie();
        await axios.post("/api/boards",{title : title,userId : userId});//この後作った人のusernameを反映させなければならないので注意する
        console.log("投稿が成功しました")
    } catch (err) {
        console.log(err);
    }

})