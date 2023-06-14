const audio = document.getElementById("audio");
const button = document.getElementById("button");
const container = document.getElementById("container");

let joke = ['',''];

// This function uses the https://responsivevoice.org/ API check their doc for more info
async function tellJoke() {
    try{
        toggleButton();
        await getJokes();
        responsiveVoice.speak(joke[0]);
        // Create a <p> element to show the joke setup
        const jokesetupElement = document.createElement('p');
        container.appendChild(jokesetupElement);
        revealText(jokesetupElement,joke,0);
        setTimeout(()=>{
            responsiveVoice.speak(joke[1],'UK English Female',{onend: function () {
                toggleButton();
            },});
             // Create a <p> element to show the joke punchline
            const jokepunchlineElement = document.createElement('p');
            container.appendChild(jokepunchlineElement);
            revealText(jokepunchlineElement,joke,1);
        },5500);
    }catch(error){
        console.log('Error telling a joke', error);
    }
}

// Get jokes from https://official-joke-api.appspot.com/ Api
async function getJokes(){
    const apiUrl = 'https://official-joke-api.appspot.com/random_joke';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        const setup = data.setup;
        const punchline = data.punchline;
        if(setup && punchline){
            joke[0] = setup;
            joke[1] = punchline;
        }
    }catch(error){
        console.log("Can't get Joke ",error);
    }
}

function removeElementsByTag(tagName) {
    var elements = document.querySelectorAll(tagName);
    for (var i = 0; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }
}

// This function reveals the text in a letter by letter manner
function revealText(element,joke,index) {
    for(let i=0;i<joke[index].length;i++){
        setTimeout(()=>{
            element.textContent+=joke[index].charAt(i);
        },50*(i + 1));
    }
}

// Disable/Enable button
function toggleButton(){
    button.disabled = !button.disabled;
}