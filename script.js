const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes= [];
// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden= true;
}
// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden= false;
}
// Show New Quote 
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
    // Check if author is present and ifnot present replaceit with unknown
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');  
    }else{
        quoteText.classList.remove('long-quote'); 
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}
// Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes =await response.json();
        newQuote();
        // console.log(apiQuotes);
    }catch(error){
        // Catch error here
        console.error(error);
    }
}
// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// On Load
getQuotes();
// Event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
