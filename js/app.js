/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function clearTable() {
    let elementsToRemove = document.querySelectorAll('.card');
    function removeCards(card) {
        card.remove();
    }

    elementsToRemove.forEach(removeCards);
}

function makeDeck(items) {
    let deckGrid = document.querySelector('.deck');

    function makeNewCard(item) {
        let li = document.createElement('li');
        li.className = 'card';
        li.innerHTML = `<i class="fa fa-${item}"></i>`;
        deckGrid.appendChild(li);
        return li;
    }

    return items.map(makeNewCard);
}

let cardSymbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let newDeckItems = shuffle(cardSymbols);
let cardElements;
let pauseEvents = false;

clearTable();
cardElements = makeDeck(newDeckItems);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displayCardSymbol(card) {
    card.classList.add('show');
}

function addToOpenCards(card) {
    card.classList.add('open');
}

function checkForMatch() {
    let openCards = document.querySelectorAll('.open');

    if (openCards.length === 1) {
        return;
    }

    // Check if cards match
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        lockCardsOpen(openCards);
        checkForWin();
    } else {
        pauseEvents = true;
        setTimeout(hideCards, 1000, openCards);
    }

    incrementCounter();
}

function lockCardsOpen(cards) {
    cards.forEach(function (card) {
        card.classList.remove('show');
        card.classList.remove('open');
        card.classList.add('match');
    });
}

function hideCards(cards) {
    cards.forEach(function (card) {
        card.classList.remove('show');
        card.classList.remove('open');
    });
    pauseEvents = false;
}

function incrementCounter() {
    let counterElement = document.querySelector('.moves');
    counterElement.innerText = parseInt(counterElement.innerText) + 1;
}

function checkForWin() {
    let totalCards = document.querySelectorAll('.card').length;
    let totalMatches = document.querySelectorAll('.match').length;

    if (totalCards === totalMatches) {
        alert('You win! Score: ' + document.querySelector('.moves').innerText);
    }
}

function attachEventHandler(cardElement) {
    cardElement.addEventListener('click' , function (event) {
        if (pauseEvents) {
            return;
        }

        let card = event.srcElement;
        displayCardSymbol(card);
        addToOpenCards(card);
        checkForMatch();
    });
}

cardElements.forEach(attachEventHandler);
