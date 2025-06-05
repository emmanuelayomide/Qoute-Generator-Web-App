// animation activation

// getting the code from Api...i make use of public Api
async function fetchQuoteInfo(){
    try{
        const response = await axios.get('https://dummyjson.com/quotes/random');
        console.log(response.data);
        return response.data;
    }catch (error) {
        console.error("Error fetching quote:", error);
        return null;
    }
}

const twitterBtn = document.getElementById('twitterShare');

function updateTwitterLink() {
  const quote = document.getElementById('quoteText').textContent;
  const author = document.getElementById('author').textContent;
  const fullQuote = `${quote} - ${author}`;
  
  // Encode for URL
  const tweetText = encodeURIComponent(fullQuote);
  
  // Set href to share on Twitter
  twitterBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
}

// Call this whenever the quote changes




async function fetchQuote(){
    const menu = await fetchQuoteInfo();
const quoteText = document.getElementById('quoteText');
const author = document.getElementById('author');
if(menu){
quoteText.textContent = `"${menu.quote}"`;
author.textContent = menu.author;

updateTwitterLink();
}
    else{
        quoteText.textContent = "Never Give up because you never Know if the next try is going to be the one that works";
        author.textContent = "Mary Kay Ash";
    }
}

const infoPAge = document.querySelector(".usersMessage");
infoPAge.style.display = "none";

// the copy functionaility using naviga clipbo
const copy = document.querySelector(".bi-clipboard");
copy.addEventListener("click", async ()=>{
   
    const quotefromPAge = document.getElementById('quoteText').textContent;
    const authorfromPage = document.getElementById('author').textContent;
    const fullcopyquotes = quotefromPAge + " - " + authorfromPage;
 try{
await navigator.clipboard.writeText(fullcopyquotes);

  document.querySelector("#infoM").textContent = "Copied to clipboard!";
  infoPAge.style.display = "flex";

    setTimeout(() => {
      infoPAge.style.display = "none";
    }, 500);
} catch(error){
    console.error("Failed to copy text: ", error);
    alert("Failed to copy text");
  }
 

})

// speach out Functionality
const readQuoteOut = document.querySelector(".bi-volume-up-fill");
readQuoteOut.addEventListener("click", ()=>{
// alert("reading text")
const quoteText = document.getElementById('quoteText').textContent;
const authorText = document.getElementById('author').textContent;

const fullreadingQuote = quoteText + " by " + authorText;    
const imgVoice = document.querySelector("#imgVoice");
imgVoice.style.display = "flex"; // Hide the image when reading out loud
window.speechSynthesis.cancel(); 
const voice = new SpeechSynthesisUtterance(fullreadingQuote);
voice.lang = 'en-US';
voice.rate = 1; 
voice.pitch = 1;
window.speechSynthesis.speak(voice);
voice.onend = () => {
    imgVoice.style.display = "none"; // Show the image again after reading
  };
})

// sharing post on twitter X as the new company name




fetchQuote();