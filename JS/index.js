const userInfo = document.getElementById("userInfo");
const nameLabel = document.createElement("label");
const nameInput = document.createElement("input");
const emojiSelect = document.createElement("label");
const dropdown = document.getElementById("dropdown");
const selectLabel = document.createElement("label");
const game = document.getElementById("game");

userInfo.classList.add("mb-3");
nameLabel.classList.add("form-label");
nameInput.classList.add("form-control", "bg-success-subtle");
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
    display.innerHTML =`Hi ${name}! lets play ${emoji}`
   
    game.appendChild(display)
})

// function for selecting emoji randomly if user doesnt select
function selectEmoji(){
   const options = dropdown.querySelectorAll("option")
   let randomIndex = Math.floor(Math.random() * options.length);
    let selected = dropdown.selectedIndex;
   if(selected == -1){
// set property of the select element to the random to selecting a random option from the dropdown.
    selected = randomIndex;
    return dropdown.options[selected].value
   }
   
   return dropdown.options[selected].value;
}