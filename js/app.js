let winning = 0;
let onTimer = false;
let secs = 0;
let mins = 0;
let myTimer;
const replay = document.querySelector('h2'); 
const deck  = document.querySelector('.deck');
const restart = document.querySelector('.restart');
function shuffle(array) { // shuffle the cards
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array; //returns the shuffled array list
}
function shuffleCard() {   //checks for the neccesary things and also convert the list of cards into an array before shuffling
     const card  = document.querySelectorAll('.deck .card');
     let count = 0;
     for(const position of card){
          if(card[count].classList.contains('match')){ //removes the classname (match) from cards that contains the the classname (match) 
              card[count].classList.toggle('match');
              
          }
          if(card[count].classList.contains('open')){ //removes the classname (open) from cards that contains the the classname (open) 
              card[count].classList.toggle('open');
             
          }
          if(card[count].classList.contains('disable')){ //removes the classname (disable) from cards that contains the the classname (disable) 
              card[count].classList.toggle('disable');
        
          }
          if(card[count].id === 'tempId'){ //remove the id with name tempId
                     card[count].removeAttribute('id', 'tempId');  
          }
          ++count;
      }
     const cardArray = Array.from(card);
     const cardShuffle = shuffle(cardArray);
     
     for(const position of cardShuffle){
          deck.appendChild(position);  //adds each card back to the list of cards after shuffling
   }
}
function winner() {   // shows the winner screen with the ratings and number of moves
	deck.setAttribute('style','display: none;');
	const congrat = document.querySelector('.congrat');
	congrat.setAttribute('style','display: visible;');
	restart.setAttribute('style','display: none;');
  replay.style.display = 'block';
  stopTimer();
}
function disable() { // this remove the reactive behaviour after some time for cards that dont match
    const cardClicked  = document.querySelectorAll('.deck #tempId');
    cardClicked[0].classList.toggle('disable');
    cardClicked[1].classList.toggle('disable');
    cardClicked[0].classList.toggle('open');
    cardClicked[1].classList.toggle('open');
    cardClicked[0].removeAttribute('id');
    cardClicked[1].removeAttribute('id');
}
function flipCard() { // this give a reactive behaviour when cards dont match
	  const cardClicked  = document.querySelectorAll('.deck #tempId');
	  cardClicked[0].classList.toggle('disable');
    cardClicked[1].classList.toggle('disable');
    setTimeout( disable,500);
}
function compareCards() {  //this compares both cards and when they match ,it leaves them opened else it closes the card back by calling the flipCard function.
	 const cardClicked  = document.querySelectorAll('.deck #tempId');
     const cards = document.querySelectorAll('.deck #tempId .fa');     
    
      if(cardClicked.length === 2) {
  
         if(cards[0].classList.value === cards[1].classList.value) {
         	
          cardClicked[0].classList.toggle('match');
         	cardClicked[1].classList.toggle('match'); 
         	cardClicked[0].removeAttribute('id');
         	cardClicked[1].removeAttribute('id');
            winning++;
          }else {
              flipCard();
         }
      }
      if(winning === 8) { // this checks if all cards have being match and calls the winner function after 1 sec
          setTimeout(winner,1000); 
          winning=0;
      }
}
function countMoves() { //counts the number of moves and change the star  rating base on the number of moves 
     const checkMove = document.querySelector('.movesClass');
     const numMoves  = document.querySelector('.score-panel .moves');
      ++(numMoves.innerHTML);
      const starGrade  = document.querySelectorAll('.score-panel .stars li');
     
      if(numMoves.innerHTML == 26) {  //changes the rating to two stars at 26 moves
           starGrade[2].setAttribute('style','color:#d3d3d3;');
      } else if(numMoves.innerHTML == 36) { //changes the rating to two stars at 36 moves
           starGrade[1].setAttribute('style','color:#d3d3d3;');
      }

      if(numMoves.innerHTML == 1) {  //checks for singular and plural for moves
             checkMove.innerHTML = "move";
      } else {
             checkMove.innerHTML = "moves";
      }
}
function showCard(clickedCard) { //this shows the card whenever it is clicked and when the lenght of the card is 2 it calls the function compareCards()
     
     clickedCard.setAttribute('id','tempId');
     const card  = document.querySelectorAll('.deck #tempId');
     clickedCard.classList.toggle('open');

     if(card.length === 2) {   //check if two cards have been clicked, then compare them
           compareCards();
      }
       
     countMoves();
}
function resetScreen() {   //this reset the game to default
	     shuffleCard();
       const numMoves  = document.querySelector('.score-panel .moves');
       const starGrade  = document.querySelectorAll('.score-panel .stars li');
       const congrat = document.querySelector('.congrat');
	     numMoves.innerHTML = 0;
       starGrade[2].setAttribute('style','color:gold;');
       starGrade[1].setAttribute('style','color:gold;');
	     congrat.setAttribute('style','display: none;');
	     restart.setAttribute('style','display: visible;');
       deck.setAttribute('style','display: visible;');
       replay.style.display = 'none';
       resetTime();
}
function count() { //counts the time for both mins and seconds
     if(onTimer === true) {
          secs++;
          document.querySelector('.seconds').innerHTML = secs;
          if(secs === 60) {
               mins++;
               secs = 0;
               document.querySelector('.seconds').innerHTML = secs;
               document.querySelector('.mins').innerHTML = mins;
          }
     }
}
function startTimer() { //starts the time when player click the first card
           myTimer = setInterval('count()', 1000);
}
function stopTimer() { // stop the the time when finish with the game
	  onTimer = false;
    clearInterval(myTimer);
}
function resetTime() { // resets the time
       stopTimer();
       mins = 0;
       secs = 0;
       document.querySelector('.seconds').innerHTML = secs;
       document.querySelector('.mins').innerHTML = mins;
}
function checkClicked(e) {  //checks for which cards was clicked
	     
	     if (e.target !== e.currentTarget) {
       
            if(e.target.className === "card" && e.target.className !== "match"){
              
                 if (onTimer === false){  //starts the timer on first click
                    startTimer();
                    onTimer = true;
                }
                showCard(e.target);
          }
     }
    e.stopPropagation();
}
document.addEventListener('DOMContentLoaded',function() {
      
      resetScreen();   //this reset the game to default format
      
      deck.addEventListener("click", checkClicked, false); //this listens to the click event for the cards
      restart.addEventListener('click',resetScreen, false); // reset the game when the reset button is clicked

      restart.addEventListener('mouseover', function() {   //listens to the mouseover of the reset button
      	  restart.setAttribute('style','border: 1px solid black;'); 
      }, false);

      restart.addEventListener('mouseout', function() {    //listens to the mouseout of the reset button
      	  restart.setAttribute('style','border:none;');
      }, false);
      
      replay.addEventListener('click',resetScreen,false); // allows the player to play again
});     
         
