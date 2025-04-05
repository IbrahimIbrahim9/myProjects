let blockQuote = document.querySelector("blockquote");
let authorName = document.querySelector(".quotes-box .author");
var api_url = "https://api.quotable.io/random";
async function getQuote(api_url) {
    let result = await fetch(api_url);
    let data = await result.json();
    blockQuote.innerHTML = data.content;
    authorName.innerHTML = data.author;
}
getQuote(api_url)