const btnHamburger = document.querySelector("#btnHamburger");
const header = document.querySelector(".header");
const overlay = document.querySelector(".overlay");
const fadeElems = document.querySelectorAll(".has-fade"); // overlay and menu
const body = document.querySelector("body");

btnHamburger.addEventListener("click", function () { // open
    if (header.classList.contains("open")) {
        body.classList.remove("no-scroll")
        header.classList.remove("open");
        fadeElems.forEach(function (e) {
            e.classList.add("fade-out");
            e.classList.remove("fade-in");
        })

    } else {                                  // close 
        body.classList.add("no-scroll")
        header.classList.add("open");
        fadeElems.forEach(function (e) {
            e.classList.remove("fade-out");
            e.classList.add("fade-in")
        })


    }
})