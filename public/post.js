const params = window.location.search;//windowobjectの中のidが欲しい
const id = new URLSearchParams(params).get("id");


const showPosts = async () => {
    try {
        const { data: boards } = await axios.get(`/api/posts/${id}`);

        //console.log(boards);

        const allBoards = boards.map((board) => {//Array.map
            
            const { title, _id, userId } = board;
            //console.log(title);


            //userIdのことも考えなくては
            return `
            <div class="single-thread">
                <div class="task-links">
                    <!--編集リンク-->
                    <a href="post.html?id=${_id}" class="edit-link">
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

showPosts();



submitDOM.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const title = contentDOM.value;
    console.log(title);
    try {
        await axios.post("/api/boards",{title : title});//この後作った人のusernameを反映させなければならないので注意する
        contentDOM.value = "";
        console.log("投稿が成功しました")
        showBoards();
    } catch (err) {
        console.log(err);
    }

})