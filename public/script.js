const boardsDOM = document.querySelector(".thread-section");
//console.log(boardsDOM);

const showBoards = async () => {
    try {
        const { data: boards } = await axios.get("/api/boards");

        //console.log(boards);

        const allBoards = boards.map((board) => {//Array.map
            
            const { title, _id, userId } = board;
            console.log(title);


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
        console.log(allBoards);

        boardsDOM.innerHTML = allBoards;

    } catch (err) {
        console.log(err);
    }

}

showBoards();