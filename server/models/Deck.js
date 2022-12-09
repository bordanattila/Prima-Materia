const { Schema } = require("mongoose");

// import card schema from Card.js
const cardSchema = require("./Card");

// define card schema
const deckSchema = new Schema(
    {
        title: {
            type: String, 
            required: true, 
        },
        cardId: { type: ObjectId, required: false },
        cards: [cardSchema]
    }
);

const Deck = model('Deck', deckSchema);
module.exports = Deck;
