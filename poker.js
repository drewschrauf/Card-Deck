Poker = {
	Suits: ['Club', 'Diamond', 'Heart', 'Spade'],
	Ranks: ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace']
}

///////////////////////////////////////////////////////////////////////////////
// The Deck
///////////////////////////////////////////////////////////////////////////////

// create a shuffled deck
Poker.Deck = function() {
	this._cards = [];
	this._populate();
	this.shuffle();
}

// add all 52 cards to a deck
Poker.Deck.prototype._populate = function() {
	for (var i = 0; i < 52; i++) {
		this._cards.push(i);
	}
}

// return the next card index and remove it from the deck
Poker.Deck.prototype._next = function() {
	var remaining = this._cards.length;
	var card = this._cards[remaining - 1];
	this._cards.length = remaining - 1; // sneaky way to remove the last element from an array (faster)
	return card;
}

// shuffle the remaining cards in a deck
Poker.Deck.prototype.shuffle = function() {
	var i = this._cards.length, j, temp;
	if (i === 0) return false;
	while (--i) {
		j = Math.floor( Math.random() * (i + 1) );
		temp = this._cards[i];
		this._cards[i] = this._cards[j];
		this._cards[j] = temp;
	}
}

// return a Card object representing the next card and remove it from the deck
Poker.Deck.prototype.dealCard = function() {
	return this.hasMore() ? new Poker.Card(this._next()) : null;
}

// return an array of cards up to the given size
// may be smaller than given size if not enough cards remain
Poker.Deck.prototype.dealHand = function(size) {
	var hand = [];
	while (size > 0 && this.hasMore()) {
		hand.push(this.dealCard());
		size--; // usually bad practice to modify a parameter... be careful with this
	}
	return hand;
}

// are there more cards in the deck?
Poker.Deck.prototype.hasMore = function() {
	return this._cards.length > 0;
}

///////////////////////////////////////////////////////////////////////////////
// The Card
///////////////////////////////////////////////////////////////////////////////

// create a card from an index
Poker.Card = function(index) {
	this._cardIndex = index;
	this.suit = Poker.Suits[Math.floor(this._cardIndex / 13)]; // divide for the suits
	this.rank = Poker.Ranks[this._cardIndex % 13]; // modulo for the rank
}

///////////////////////////////////////////////////////////////////////////////
// Testing Code
///////////////////////////////////////////////////////////////////////////////

// create a new deck to test dispersion
console.log("Creating new deck");
deck = new Poker.Deck();

// deal
console.log("Emptying deck");
suits = {};
ranks = {};
while (deck.hasMore()) {
	var card = deck.dealCard();
	var suitCount = suits[card.suit];
	suits[card.suit] = !!suitCount ? suitCount + 1 : 1;
	var rankCount = ranks[card.rank];
	ranks[card.rank] = !!rankCount ? rankCount + 1 : 1;
}

// check 13 of each 4 suits
console.log("Checking ranks...")
var rankCount = 0;
var rankError = false;
for (rank in ranks) {
	rankCount++;
	if (ranks[rank] != 4) {
		console.error("Incorrect number of cards in rank");
		rankError = true;
	}
}
if (rankCount != 13) {
	console.error("Incorrect number of ranks");
	rankError = true;
}
console.log(rankError ? "Error in ranks" : "OK");

// check 13 of each 4 suits
console.log("Checking suits...")
var suitCount = 0;
var suitError = false;
for (suit in suits) {
	suitCount++;
	if (suits[suit] != 13) {
		console.error("Incorrect number of cards in suit");
		suitError = true;
	}
}
if (suitCount != 4) {
	console.error("Incorrect number of suits");
	suitError = true;
}
console.log(suitError ? "Error in suits" : "OK");

// create another deck to check dealing scenarios
console.log("Creating another deck");
var deck2 = new Poker.Deck();

// check that the decks are separate
deck2.hasMore() ? console.log("New deck has cards") : console.error("New deck is empty");
deck.hasMore() ? console.error("Old deck still has cards") : console.log("Old deck is empty");

// check that dealing hands works properly
console.log("Dealing a hand");
var hand = deck2.dealHand(51);
hand.length == 51 ? console.log("Correct number of cards dealt") : console.error("Incorrect number of cards dealt");
console.log("Dealing a partial hand")
var hand2 = deck2.dealHand(51);
hand2.length == 1 ? console.log("Correct number of cards dealt") : console.error("Incorrect number of cards dealt");

// check deck is now empty
deck2.hasMore() ? console.error("New deck should be empty") : console.log("New deck is empty");
