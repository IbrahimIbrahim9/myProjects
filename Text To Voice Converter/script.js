let speech = new SpeechSynthesisUtterance();
let languageSelect = document.querySelector("select")

document.querySelector("button").addEventListener("click", () => {
    speech.lang = `${languageSelect.value}` ; 
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})