"use strict";

let cardsArray = [];
let match = 0;
let tried = 0;
let lastTwoCardIds = [];

function createCardsArray(number_cards) {
    for (let i = 0; i < 2; i++) {
        for (let i = 1; i < number_cards + 1; i++) {
            let cardName = i.toString();
            let img = "images/" + cardName + ".jpg";
            cardsArray.push({ cardName, img });
        }
    }
    cardsArray.sort(() => 0.5 - Math.random());
}


function fillDivWithCards() {
    let gridCards = document.querySelector('#all_cards_container');

    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/back.jpg');
        card.setAttribute('id', i);
        card.addEventListener('click', flipCard);
        gridCards.appendChild(card);
    }
}


function flipCard() {
    const currentCard = cardsArray[this.id];

    if (lastTwoCardIds.length === 0 || lastTwoCardIds.at(-1) != this.id) {
        this.setAttribute('src', currentCard.img);
        lastTwoCardIds.push(this.id);
    }

    if (lastTwoCardIds.length == 2) {
        makeUnClickable();
        setTimeout(checkIfPair, 1000);
    }
}


function checkIfPair() {
    const cardOne = document.getElementById(lastTwoCardIds[0]);
    const cardTwo = document.getElementById(lastTwoCardIds[1]);
    tried++;

    if (cardsArray[lastTwoCardIds[0]].cardName == cardsArray[lastTwoCardIds[1]].cardName) {
        cardOne.setAttribute('src', 'images/blank.jpg');
        cardTwo.setAttribute('src', 'images/blank.jpg');
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        match++;

        if (match * 2 == cardsArray.length) {
            let cardContainer = document.getElementById("all_cards_container");
            cardContainer.innerHTML = '';

            let alert = document.createElement('div');
            alert.setAttribute('id', 'alert');
            alert.textContent = 'You won!';
            cardContainer.appendChild(alert);

            let tries = document.createElement('div');
            tries.setAttribute('id', 'tries');
            tries.textContent = 'Number of tries: ' + tried;
            cardContainer.appendChild(tries);

            reset_all_values();
            setTimeout(newGame, 3000);
        }
    }

    else {
        cardOne.setAttribute('src', 'images/back.jpg');
        cardTwo.setAttribute('src', 'images/back.jpg');
    }

    lastTwoCardIds = [];
    makeUnClickable(false);
}

function reset_all_values() {
    cardsArray = [];
    match = 0;
    tried = 0;
    lastTwoCardIds = [];
}

function makeUnClickable(click = true) {
    let gridCards = document.querySelector('#all_cards_container');

    if (click === true) {
        gridCards.setAttribute('class', 'disable-click');
    }

    else {
        gridCards.classList.remove('disable-click');
    }
}

function newGame() {
    document.getElementById("all_cards_container").innerHTML = '';

    let alert = document.createElement('div');
    alert.setAttribute('id', 'play_again');
    alert.textContent = 'Select the difficulty';
    document.querySelector('#all_cards_container').appendChild(alert);

    for (let i = 1; i < 4; i++) {
        let btn = document.createElement('button');
        btn.setAttribute('id', i);
        btn.textContent = 'level ' + i;
        btn.addEventListener('click', chooseDifficutly);
        document.querySelector('#all_cards_container').appendChild(btn);
    }
}


function chooseDifficutly() {
    const numberOfCards = [5, 10, 15];
    document.getElementById("all_cards_container").innerHTML = '';
    createCardsArray(numberOfCards[this.id - 1]);
    fillDivWithCards();
}

newGame();