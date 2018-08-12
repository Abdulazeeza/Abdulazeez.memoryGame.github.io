let winning = 0;
let onTimer = false;
let secs = 0;
let mins = 0;
let myTimer;
let playerNumber = 1;
const replay = document.querySelector('h2'); 
const deck  = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const clipBoard = document.querySelector('.score-board');

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
     const cardArray = Array.from(card); //convert  cards to array
     const cardShuffle = shuffle(cardArray); // shuffle cards
     
     for(const position of cardShuffle){
          deck.appendChild(position);  //adds each card back to the list of cards after shuffling
   }
}
function winner() {   // shows the winner screen with the ratings and number of moves
	deck.setAttribute('style','display: none;');  //removes the board game
	const congrat = document.querySelector('.congrat'); 
	congrat.setAttribute('style','display: visible;');  // shows the congratulation message
	restart.setAttribute('style','display: none;');    // remove the reset button 
    replay.style.display = 'block';    //show the replay button
    clipBoard.style.display = 'none';  //remove the leaderboard
    stopTimer();
}
function disable() { // this remove the reactive behaviour after some time for cards that dont match
     const cardClicked  = document.querySelectorAll('.deck #tempId');
     const card = document.querySelectorAll('.deck .card');
     const mainCard = document.querySelectorAll('.deck .card');
     let countDisable = 0;
     cardClicked[0].classList.toggle('open');  //remove class open to card 1
     cardClicked[1].classList.toggle('open');  //remove class open to card 2 

     
     for(const cards of Array.from(card)){ // loops through all the cards to check if they is any overlap 
         
          if(card[countDisable].classList.contains('disable')){ //if card contains the disable class then remove
              card[countDisable].classList.toggle('disable');
          }

          if(card[countDisable].classList.contains('open')){  //if card contains the open class then remove
              card[countDisable].classList.toggle('open');
          }
          countDisable++;
     }
     countDisable = 0;

     cardClicked[0].removeAttribute('id');  //remove the id attribute
     cardClicked[1].removeAttribute('id');  //remove the id attribute
}
function flipCard() { // this give a reactive behaviour when cards dont match
	 const cardClicked  = document.querySelectorAll('.deck #tempId');
	 cardClicked[0].classList.toggle('disable');  //add the disable card
     cardClicked[1].classList.toggle('disable');  //add the disable card
     setTimeout(disable,600);  //wait for 600ms and call disable function
}
function compareCards() {  //this compares both cards and when they match ,it leaves them opened else it closes the card back by calling the flipCard function.
	 const cardClicked  = document.querySelectorAll('.deck #tempId');
     const cards = document.querySelectorAll('.deck #tempId .fa');     
  
         if(cards[0].classList.value === cards[1].classList.value) { // checks if both cards matches
         	cardClicked[0].classList.toggle('match'); // adds the class match to card 1
         	cardClicked[1].classList.toggle('match');  // adds the class match to card 2
            cardClicked[0].classList.toggle('open');  //remove class open to card 1
            cardClicked[1].classList.toggle('open');  //remove class open to card 2 
         	cardClicked[0].removeAttribute('id');    // remove the id to card 1
         	cardClicked[1].removeAttribute('id');   // remove the id to card 2
            winning++; //increase the num of cards matched

          }else {
            flipCard();  
         }
 
      if(winning === 8) { // this checks if all cards have being match and calls the winner function after 1 sec
          setTimeout(winner,1000); 
      }
}
function showCard(clickedCard) { //this shows the card whenever it is clicked and when the lenght of the card is 2 it calls the function compareCards()
    
     clickedCard.setAttribute('id','tempId');
     clickedCard.classList.toggle('open');
     const card  = document.querySelectorAll('.deck #tempId');

     if(card.length === 2) {   //check if two cards have been clicked, then compare them
           compareCards();
      }
      countMoves();  //calls the function that count the moves
}
function checkClicked(e) {  //checks for which cards was clicked

	     if (e.target !== e.currentTarget) {
       
            if(e.target.className === "card" && e.target.className !== "match"){
                  
                   showCard(e.target);  //calls the card functionalities

                 if (onTimer === false){  //starts the timer on first click
                    startTimer();
                    onTimer = true;  // reset the time to on 
                }
            }
     }
     e.preventDefault();
     e.stopPropagation();
}
function resetScreen() {   //this reset the game to default
	   shuffleCard();
       const numMoves  = document.querySelector('.score-panel .moves');
       const starGrade  = document.querySelectorAll('.score-panel .stars li');
       const congrat = document.querySelector('.congrat');
	   numMoves.innerHTML = 0;       //resets num of moves
       starGrade[2].setAttribute('style','color:gold;'); // reset the star color to gold
       starGrade[1].setAttribute('style','color:gold;');
	   congrat.setAttribute('style','display: none;');    //removes the congratulation message
	   restart.setAttribute('style','display: visible;'); // make the reset button visible
       deck.setAttribute('style','display: visible;');   // make the board visible
       replay.style.display = 'none';   // removes the replay button
       resetTime();  //reset the time
       winning = 0;  // initial cards that matches to zero
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
             checkMove.innerHTML = "move"; //gives the singular of moves
      } else {
             checkMove.innerHTML = "moves";  //gives the plural of move
      }
}
function count() { //counts the time for both mins and seconds
     if(onTimer === true) {
          secs++;
          document.querySelector('.seconds').innerHTML = secs;
          if(secs === 60) { // checks if the secs is 60 and the reset the sec to 0 and increase the num of min by 1
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
function addScore() {
      const PlayerMove = document.querySelector('.moves').innerHTML; //get the value of num of moves
      let PlayerRating;
      let timeSpent;
      let minSpend;
      let secSpend;
       //adds the star rating of player base on the number of moves
     if(PlayerMove < 26){  //check if the num of move is less than 26 and set the star rating to 3
        PlayerRating = '3 Stars';  
     }
     else if(PlayerMove >= 26 && PlayerMove < 36) {  //check if the num of move is greater or equal to 26 and set the star rating to 2
        PlayerRating = '2 Stars';
     }
     else{    //if the num of moves is greter or equal to 36 set star rating to 1 
        PlayerRating = '1 Star';
     }

     if(document.querySelector('.mins').innerHTML == 1) {  // checks for plural and singular of mins and give it the right word
        minSpend = `${document.querySelector('.mins').innerHTML} min : `;  
     } else {
        minSpend = `${document.querySelector('.mins').innerHTML} mins : `;
     }

     if(document.querySelector('.seconds').innerHTML == 1){ // checks for plural and singular of secs and give it the right word
        secSpend = `${document.querySelector('.seconds').innerHTML} sec`;
     }else {
        secSpend = `${document.querySelector('.seconds').innerHTML} secs`;
     }

      timeSpent = minSpend + secSpend; // concatenates the mins and secs
      const table = document.querySelector('table');
      const addRow = table.insertRow(table.rows.length);  // add row to the table
      const cell1 = addRow.insertCell(0);  //add column to the added row
      const cell2 = addRow.insertCell(1);  //add column to the added row
      const cell3 = addRow.insertCell(2);  //add column to the added row
      const cell4 = addRow.insertCell(3);  //add column to the added row

      cell1.innerHTML = playerNumber;   //adds the playerNumber to cell1
      cell2.innerHTML = PlayerMove;     //adds the playerMove to cell2
      cell3.innerHTML = PlayerRating;   //adds the playerRating to cell3
      cell4.innerHTML = timeSpent;      //adds the timeSpent to cell4
      resetScreen();
      clipBoard.style.display = 'block';  //displays the leaderboard
      playerNumber++;
}
document.addEventListener('DOMContentLoaded',function() {
      
      resetScreen();   //this reset the game to default format
      clipBoard.style.display = 'none';
      deck.addEventListener("click", checkClicked, false); //this listens to the click event for the cards
      restart.addEventListener('click',resetScreen, false); // reset the game when the reset button is clicked

      restart.addEventListener('mouseover', function() {   //listens to the mouseover of the reset button
      	  restart.setAttribute('style','border: 1px solid black;'); 
      }, false);

      restart.addEventListener('mouseout', function() {    //listens to the mouseout of the reset button
      	  restart.setAttribute('style','border:none;');
      }, false);

      replay.addEventListener('click',addScore,false);   //on replay call addSore to reset and and leaderboard
});     
         
