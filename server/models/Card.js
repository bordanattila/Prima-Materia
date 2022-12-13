const { Schema } = require("mongoose");

// define deck schema
const cardSchema = new Schema(
    {
        cardId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        color: [
            {
                type: String,
                required: true,
            }
        ],
        text: {
            type: String,
            required: true,
        },
        image: 
            {
                type: String,
            }
    }
);

module.exports = cardSchema;