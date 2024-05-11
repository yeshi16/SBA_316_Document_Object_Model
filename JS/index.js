const userInfo = document.getElementById("userInfo");
const nameLabel = document.createElement("label");
const nameInput = document.createElement("input");
const emojiSelect = document.createElement("label");
const dropdown = document.getElementById("dropdown");
const selectLabel = document.createElement("label");
const game = document.getElementById("game");

userInfo.classList.add("mb-3");
nameLabel.classList.add("form-label");
nameInput.classList.add("form-control", "bg-success-subtle", "w-50");
nameLabel.setAttribute("for", "username");
nameInput.setAttribute("id", "username");
nameInput.setAttribute("type", "text");
nameInput.required = true;
nameInput.placeholder = "Type your name here";
nameLabel.textContent = "Name";
selectLabel.textContent = "Which animal represents you";

userInfo.insertBefore(nameLabel, dropdown);
userInfo.insertBefore(nameInput, userInfo.children[1]);
userInfo.insertBefore(selectLabel, userInfo.children[2]);

const startGame = document.createElement("button");
startGame.classList.add("btn", "btn-success");
userInfo.appendChild(startGame).textContent = "Start Game";

// style
document.body.style.color = "#308b55";
selectLabel.style.paddingTop = "5px";
selectLabel.style.paddingBottom = "5px";
userInfo.style.padding = "15px"


const cardDisplay = document.createElement("div")
cardDisplay.textContent = `Phrase Card`
cardDisplay.classList.add("w-70", "text-center")// "border", "border-success-subtle"
game.prepend(cardDisplay)


const userInput = document.createElement("input");
userInput.classList.add("form-control", "bg-success-subtle", "w-50");
userInput.setAttribute("type", "text");
userInput.placeholder = "Type your phrase";
const hint = document.createElement("p")
const result = document.createElement("p")
let guessNum = 6;
hint.classList.add("border-bottom", "border-success")
result.classList.add("border-bottom", "border-success")
hint.style.display = "none";
userInput.style.marginTop = "15px";
userInput.style.marginBottom = "15px";
cardDisplay.style.padding = "15px"
cardDisplay.style.alignItems = "center"
game.appendChild(userInput)
game.appendChild(hint)
game.appendChild(result)
game.style.display = "none"


// function for selecting emoji randomly if user doesnt select
function selectEmoji() {
    const options = dropdown.querySelectorAll("option");
    let randomIndex = Math.floor(Math.random() * options.length);
    let selected = dropdown.selectedIndex;

    if (selected === -1 || selected === 0) {
        // Select a random option from all available options
        dropdown.selectedIndex = randomIndex;
        return dropdown.options[randomIndex].value;
    } else {
        // Return the value of the selected emoji
        return dropdown.options[selected].value;
    }
}

// event handler to dispaly name and emoji
startGame.addEventListener("click", function () {
    const display = document.createElement("div");
    userInfo.style.display = "none";
    let name = nameInput.value;
    let emoji = selectEmoji();
    display.innerHTML = `Hi ${name}! lets play. let your inner ${emoji} out`
    result.textContent = `Lets get started ${emoji}`;
    game.prepend(display)
    game.style.display = "block"

})


// function to hide phrase card 
const cards = document.querySelectorAll(".card");

// array of phrase card phrase and hint
const phraseCards = [
    { card: cards[0], phrase: 'for once in my life', hint: 'four, life' },
    { card: cards[1], phrase: 'forget it', hint: 'four' },
    { card: cards[2], phrase: 'try to understand', hint: 'understand' },
    { card: cards[3], phrase: 'travel overseas', hint: 'over, sea' },
    { card: cards[4], phrase: 'breakfast', hint: 'break' },
    { card: cards[5], phrase: 'downtown', hint: 'down' },
    { card: cards[6], phrase: 'eyeshadow', hint: 'shadow' },
    { card: cards[7], phrase: 'stepfather', hint: 'steps' },
    { card: cards[8], phrase: 'once upon a time', hint: 'time' },
    { card: cards[9], phrase: 'potatoes', hint: "o's" },
    { card: cards[10], phrase: '3d movie', hint: '3' },
    { card: cards[11], phrase: 'top secret', hint: 'top' }

]
let cardIndex = 0;

function hideCards() {

    cards.forEach((card, index) => {
        if (index == cardIndex) {
            card.style.display = "block"
        } else {
            card.style.display = 'none';
        }
    });
    if (cardIndex >= cards.length) {
        cardIndex = 0
    }

    guessNum = 6;
    hint.style.display = "none"
}
hideCards();



// function to display hint
function displayHint(guessNum) {
    if (guessNum >= 4) {
        hint.style.display = "block";
        hint.textContent = `Hint: ${phraseCards[cardIndex].hint}`;
    } else {
        hint.style.display = "none";
    }
}

// function for get phrase
function getPhrase() {
    return phraseCards[cardIndex].phrase;
}

// function for compare user phrase with correct phrase
function checkGuess(userGuess, checkPhrase) {
    return userGuess == checkPhrase;
}

// function for game logic
function guessPhrase() {
    const userGuess = userInput.value.toLowerCase();
    checkPhrase = getPhrase();
    if (checkGuess(userGuess, checkPhrase)) {
        result.textContent = `congragualtion ${selectEmoji()} you guessed the phrase`;
        userInput.disabled = true;
        setTimeout(() => {
            cardIndex++;
            hideCards();
            result.textContent = `${selectEmoji()} lets try the next phrase`
            userInput.disabled = false;
        }, 3000);
    } else {
        guessNum--;
        if (guessNum == 0) {
            result.textContent = "Sorry you have reached max attemps"
            hint.textContent = `The phrase is: ${phraseCards[cardIndex].phrase}`;
            userInput.disabled = true;
            setTimeout(() => {
                hint.style.display = "block";
                cardIndex++;
                hideCards();
                result.textContent = `${selectEmoji()} lets try the next phrase`
                userInput.disabled = false;
            }, 3000);

        } else {

            if (guessNum == 4) {
                displayHint(guessNum)
                result.textContent = `Keep going ${selectEmoji()}. you have ${guessNum} guess left`
            } else {
                result.textContent = `Getting closer ${selectEmoji()}. you have ${guessNum} guess left`
            }
        }
    }
    userInput.focus();
    userInput.value = "";

}

// event handler for submmiting user input
userInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        guessPhrase();
    }
})

