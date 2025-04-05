let Tries = document.querySelectorAll(".left > div");
let inputsOfTheFirstTry = document.querySelectorAll(".first-try input");
let word = "rinse";
let counter = 0;
for (let Try of Tries) {
    for (let i = 0; i < Try.children.length; i++) {
        Try.children[i].addEventListener("keyup", (e) => {
            let theValue = Try.children[i].value;
            if (word[counter] === theValue) {
                Try.children[i].style.cssText = "background-color:var(--Yellow-color); opacity:0.5;";
            }
            else if (word[counter] !== theValue && word.includes(theValue)) {
                Try.children[i].style.cssText = "background-color:var(--Green-color); opacity:0.5;";
            }
            else {
                Try.children[i].style.cssText = "background-color:var(--Black-color); opacity:0.5;";
            }
            Try.children[i].readOnly = true;
            if (Try.children[i].nextElementSibling) {
                Try.children[i].nextElementSibling.focus();
                counter++;
            }
            else {
                counter = 0;
            }
        })
    }
}
