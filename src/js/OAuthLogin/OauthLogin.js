const btn = document.getElementById("btn-entrar")
var IsAdm = false

btn.addEventListener("click", (event) => {
    event.preventDefault();
    
    
    const userName = document.getElementById("login").value;
    const userPass = document.getElementById("password").value;
    
    if (userName === "educare8anoLPR" && userPass === "LPR8NE") {
        alert("Bem-vindo adm! " + userName);
        IsAdm = true
        localStorage.setItem("adm", IsAdm)
        window.location.href = '../../../index.html';
    }
})
const adm = localStorage.getItem("adm")

if (adm === "true") {
    alert("Você ja é ADM...")
    window.location.href = '../../../index.html';
}