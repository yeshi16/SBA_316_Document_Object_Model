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

// dispaly name 
startGame.addEventListener("click", function(){
    const display = document.createElement("div");
    userInfo.style.display = "none";
    let name = nameInput.value;
    let emoji = selectEmoji();
    display.innerHTML =`Hi ${name}! lets play`
   
    game.prepend(display)
})

// function for selecting emoji randomly if user doesnt select
function selectEmoji(){
   const options = dropdown.querySelectorAll("option")
   let randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1; // dont include first option
    let selected = dropdown.selectedIndex;
   if(selected === -1 || selected == 0){
// set property of the select element to the random to selecting a random option from the dropdown.
dropdown.selectedIndex = randomIndex    
return dropdown.options[randomIndex].value
   }else{
   
   return dropdown.options[selected].value;
   }
}

// game div 


/*
1 – For once in my life (four ones in my life)
2 – Forget it
3 – Try to understand
4 – Travel overseas or overseas travel
5 – Breakfast
6 – Downtown
7 – Eyeshadow
8 – Stepfather
9 – Once upon a time
10 – Potatoes (pot 8 O’s)
11 – 3D movie
12 – Top secret
*/
const images = []
const cardDisplay = document.createElement("div")
cardDisplay.textContent ="Phrase Card"
cardDisplay.classList.add("w-50", "border", "border-success-subtle")
game.prepend(cardDisplay)

// function to hide phrase card 
const cards = document.querySelectorAll(".card");
const cardSelected = cards[0];
function hideCards(selectedCard) {

    cards.forEach(card => {
        if(card != selectedCard){
            card.style.display = 'none';
        } else{
            card.style.display = 'block';
        }
       
    });
}
hideCards(cardSelected);

const userInput = document.createElement("input");
userInput.classList.add("form-control", "bg-success-subtle", "w-50");
userInput.setAttribute("type", "text");
userInput.placeholder = "Type your phrase";
game.appendChild(userInput)