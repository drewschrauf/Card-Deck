var Cards = {
	deck: [],	// Array for card index values

	cardsDealt: [],	// Array for dealt cards

	numDealt: 0,	// Keeps count of how many cards have been dealt -- Card Counter

	populateDeck: function(deck) {
		for (var i=1; i < 53; i++) {
			deck.push(i);
		}
		return deck;
	},

	shuffleDeck: function(deck) {	// Adaptation of Fisher Yates randomize array function
		var i = deck.length, j, temp;
		if (i === 0) return false;
		while (--i) {
			j = Math.floor( Math.random() * (i + 1) );
			temp = deck[i];
			deck[i] = deck[j];
			deck[j] = temp;
		}
		return deck;
	},

	getCard: function(deck, dealt) {
		var dealtCard = deck.splice(0, 1);	// updates this.deck minus the removed card
		dealt.push(dealtCard[0]);			// updates this.dealt with used card
		
		this.numDealt++;		// Updates card counter

		return(dealtCard[0]);

	},

	interpretCard: function(cardIndex) {
		var card = {},
			tempIndex = cardIndex,	// Get actual value of index from array
			adjustedVal,	// Adjusted value for position in deck
			rank;			// card 'game' value

		// Set card suit and val
		if (tempIndex < 14) {
			card.suit = "c";
			adjustedVal = tempIndex;
			rank = adjustedVal -1;
		} else if ((13 < tempIndex) && (tempIndex < 28)) {
			card.suit = "d";
			adjustedVal = tempIndex - 13;
			rank = adjustedVal -1;
		} else if ((27 < tempIndex) && (tempIndex < 40)) {
			card.suit = "h";
			adjustedVal = tempIndex - 26;
			rank = adjustedVal -1;
		} else if ((39 < tempIndex) && (tempIndex < 53)) {
			card.suit = "s";
			adjustedVal = tempIndex - 39;
			rank = adjustedVal -1;
		}
		
		// Check for face cards and aces
		if (adjustedVal === 1) {
			adjustedVal = 'A';
			rank = 13;		// Fix for ace ranking higher than king but having the lowest adjustedVal
		} else if (adjustedVal === 11) {
			adjustedVal = 'J';
		} else if (adjustedVal === 12) {
			adjustedVal = 'Q';
		} else if (adjustedVal === 13) {
			adjustedVal = 'K';
		}

		// Set card value
		card.val = adjustedVal;
		card.rank = rank;
		console.log(card);
		return card;
	},

	newHand: function() {
		this.deck = [];
		this.cardsDealt = [];
		this.numDealt = 0;
		this.populateDeck(this.deck);
		this.shuffleDeck(this.deck);

		console.log('New hand!  Good luck.');
	}
};

Cards.newHand();;