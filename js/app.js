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
// Clears the cards from the table
function clearTable() {
    let elementsToRemove = document.querySelectorAll('.card');
    function removeCards(card) {
        card.remove();
    }

    elementsToRemove.forEach(removeCards);
}

//makes li of cards and appends them to the deck
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

// adds show element
function displayCardSymbol(card) {
    card.classList.add('show');
}

// adds open element
function addToOpenCards(card) {
    card.classList.add('open');
}

// checks for match when 2nd card is clicked
function checkForMatch() {
    let openCards = document.querySelectorAll('.open');

    if (openCards.length === 1) {
        return;
    }

    // Check if cards match and checks for win condition
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        lockCardsOpen(openCards);
        checkForWin();
    } else {
        pauseEvents = true;
        setTimeout(hideCards, 1000, openCards);
    }

    incrementCounter();
}

//removes show and open and adds match element if it matches
function lockCardsOpen(cards) {
    cards.forEach(function (card) {
        card.classList.remove('show');
        card.classList.remove('open');
        card.classList.add('match');
    });
}

//hides cards if they don't match
function hideCards(cards) {
    cards.forEach(function (card) {
        card.classList.remove('show');
        card.classList.remove('open');
    });
    pauseEvents = false;
}

//counter increments after clicking two cards
function incrementCounter() {
    let counterElement = document.querySelector('.moves');
    counterElement.innerText = parseInt(counterElement.innerText) + 1;
}

//checks length of array vs length o match for win condiditon
function checkForWin() {
    let totalCards = document.querySelectorAll('.card').length;
    let totalMatches = document.querySelectorAll('.match').length;

    if (totalCards === totalMatches) {
        alert('You win! Score: ' + document.querySelector('.moves').innerText);
    }
}
//click event pauses, displays card and checks for match
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
