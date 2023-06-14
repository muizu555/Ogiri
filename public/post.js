const postsDOM = document.querySelector(".thread-section");
const params = window.location.search;//windowobjectの中のidが欲しい
const id = new URLSearchParams(params).get("id");

const submitDOM = document.querySelector(".task-form");
const contentDOM = document.querySelector(".content-input");


const showPosts = async () => {
    try {
        const { data: posts } = await axios.get(`/api/posts/${id}`);

        //console.log(boards);

        const allPosts = posts.map((post) => {//Array.map
            
            const { desc, _id, userId } = post;
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
                <p>${desc}</p>
            </div>`;
        }).join("");
        //console.log(allBoards);

        postsDOM.innerHTML = allPosts;

    } catch (err) {
        console.log(err);
    }

}

showPosts();

submitDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const desc = contentDOM.value;//中身
    console.log(desc);

    try {
        await axios.post(`/api/posts/${id}`,{desc : desc});
        contentDOM.value = "";
        console.log("投稿が成功しました");
        showPosts();
    } catch (err) {
        console.log(err);
    }

})



