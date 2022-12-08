const { Schema } = require("mongoose");

// define deck schema
const cardSchema = new Schema(
    {
        cardName: {
            type: String, 
            required: true, 
        },
        type: {
            type: String, 
            required: true,
        },
        color: {
            type: String, 
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        deckId: { type: ObjectId, required: false }
    }
);

module.exports = cardSchema;