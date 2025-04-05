// Setting Game Name 
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Ibrahim Ibrahim`;

// Setting Game Options 
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
const Words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"]
wordToGuess = Words[Math.floor(Math.random() * Words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints 
document.querySelector(".hint span").innerHTML = numberOfHints;
const hintButton = document.querySelector(".hint");
// console.log(hintButton);
hintButton.addEventListener("click", getHint);

function generateInput() {
    const inputContainer = document.querySelector(".inputs");

    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");

        // Create inputs 
        for (let j = 1; j <= numberOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.setAttribute("maxlength", "1");
            input.id = `guess-${i}-letter${j}`;
            tryDiv.appendChild(input)
        }

        inputContainer.appendChild(tryDiv);
    }
    // focus on the first input of the first element
    inputContainer.children[0].children[1].focus();

    //disable all inputs except the first one 
    const inputsInDisableDiv = document.querySelectorAll("disabled-input input");
    inputsInDisableDiv.forEach((input) => { input.disable = true });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) => {
        /*
            "this feature was added by me "
            this block of code to prevent the caret from going to the next line
            before the user click on the check word button, 
            if you remove this code and try to move using right arrow it will take
            you to the next line while it's disabled and if you kept clicking on the keyboard
            it will do the same until the end of the thirty sixth ceil at the bottom right 
         */
        const nextTryInputs = document.querySelectorAll(`.try-${index + 2} input`);
        nextTryInputs.forEach((input) => {
            input.disabled = true;
        })

        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            let nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        })

        input.addEventListener("keydown", function (event) {
            //console.log(event);
            const currentIndex = Array.from(inputs).indexOf(this); // or (event.target)
            //console.log(currentIndex);
            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();

            }
            if (event.key === "ArrowLeft") {
                const prevInput = currentIndex - 1;
                if (prevInput >= 0) inputs[prevInput].focus();

            }
        });
    });
}
console.log(wordToGuess);
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
    let successGuess = true;
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${currentTry}-letter${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];

        if (letter === actualLetter) {
            inputField.classList.add("yes-in-place");
        } else if (wordToGuess.includes(letter) && letter !== "") {
            inputField.classList.add("not-in-place");
            successGuess = false;
        } else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    //check if user won or lost 
    if (successGuess === true) {
        messageArea.innerHTML = `You won!! , the word is <span>${wordToGuess}</span>`;
        if (numberOfHints == 2) {
            messageArea.innerHTML = "<p> <span>Congrats!!</span>you won without using hints</p>"
        }
        // add disable class on all the Divs 
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"))

        //disable guess and hint button 
        guessButton.disabled = true;
        hintButton.disabled = true

    } else {
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => { input.disabled = true });

        currentTry++;

        let el = document.querySelector(`.try-${currentTry}`);
        if (el) {
            const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
            nextTryInputs.forEach((input) => {
                input.disabled = false;
            })

            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        } else {
            guessButton.disabled = true;
            hintButton.disabled = true
            messageArea.innerHTML = `You Lost!! , the word is <span>${wordToGuess}</span>`
        }
    }

}
function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }

    if (numberOfHints === 0) {
        document.querySelector(".hint").disabled = true;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");

    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value == "");

    if (emptyEnabledInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        console.log(indexToFill);

        /*
        console.log(randomIndex);
        console.log(randomInput);
        console.log(indexToFill);
        there are two images in the same folder labeled with "hint problem" 
        */

        randomInput.value = wordToGuess[indexToFill].toUpperCase();

    }
}
let counter = 0;
function handleBackspace(event) {
    if (event.key === "Backspace") {
        const inputs = document.querySelectorAll("input:not([disabled])");
        let currentIndex = Array.from(inputs).indexOf(document.activeElement);
        currentInput = inputs[currentIndex];
        prevInput = inputs[currentIndex - 1];
        if (currentIndex > 0 && currentIndex !== 5) {
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
        else {
            // "this feature was added by me "
            /*  when you reach the last input and you press on the backspace it will 
                remove the values of the last input and the input before it .
                this code change the behavior and only remove the value of the last input  */
            if (counter == 2) {
                prevInput.value = "";
                prevInput.focus();
                counter = 0;
            }
            counter++;
        }
        

    }
}
document.addEventListener("keydown", handleBackspace);
window.onload = function () {
    generateInput();
} 