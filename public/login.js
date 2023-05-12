const formDOM = document.querySelector(".task-form");
const usernameDOM = document.querySelector(".task-input");
const passwordDOM = document.querySelector(".content-input");
const updateDOM = document.querySelector(".update");
const backDOM = document.querySelector(".back");

//console.log(axios);

formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();//not reload
    const username = usernameDOM.value;
    const password = passwordDOM.value;

     console.log(usernameDOM.value);
     console.log(passwordDOM.value);

    try {
        await axios.post("/api/auth/login", { username: username, password: password});
        usernameDOM.value = "";
        passwordDOM.value="";
        window.location.href = "index.html";
    } catch (err) {
        console.log(err);
    }

})


updateDOM.addEventListener("submit", async (event) => {//ここはユーザー情報を変更する画面への遷移だけで良さそう
    event.preventDefault();//not reload
    try {
        await axios 
    } catch (err) {
        console.log(err);
    }

});

backDOM.addEventListener("click", (event) => {
    event.preventDefault();//not reload
    window.location.href = "register.html";
})




