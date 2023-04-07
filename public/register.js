const formDOM = document.querySelector(".task-form");
const usernameDOM = document.querySelector(".task-input");
const passwordDOM = document.querySelector(".content-input");

console.log(axios);


formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();//not reload
    const username = usernameDOM.value;
    const password = passwordDOM.value;

     console.log(usernameDOM.value);
     console.log(passwordDOM.value);

    try {
        await axios.post("/api/auth/register", { username: username, password: password});
        usernameDOM.value = "";
        passwordDOM.value="";
        window.location.href = "login.html";
    } catch (err) {
        console.log(err);
    }

})
