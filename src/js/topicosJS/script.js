const adm = localStorage.getItem("adm");
const btnExit = document.getElementById("exit")

btnExit.addEventListener("click", () => {
    localStorage.removeItem("adm")
    window.location.href = "../../../index.html"
})

const btnConfigOpen = document.getElementById("config")

document.addEventListener("DOMContentLoaded", () => {
    if (adm === "true") {
        btnConfigOpen.style.display = 'flex'
    } else {
        btnConfigOpen.style.display = 'none'
    }
})

btnConfigOpen.addEventListener("click", () => {
    const panel = document.getElementById("configuration-panel")
    
    panel.classList.toggle("active")
})

const menuLinks = document.querySelectorAll(".menu a[href^='#']");

menuLinks.forEach((e) => {
    e.addEventListener("click", scrollToSection)
})

function nativeScroll(distanceFromTheTop) {
    window.scroll({
        top: distanceFromTheTop,
        behavior: "smooth",

    })
}

function getDistanceFromTheTop(element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
    event.preventDefault();

    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
    nativeScroll(distanceFromTheTop);

};