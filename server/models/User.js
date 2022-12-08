const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// import schema from Card.js
const cardSchema = require("./Card");
// import schema from Deck.js
const deckSchema = require("./Deck");

// define user schema
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true, 
        },
        email: {
            type: String, 
            required: true, 
            unique: true,
            match: [/.+@.+\..+/, "Must use a valid email address"],
        },
        password: {
            type: String,
            required: true,
        },
        // set wishListCards to be an array of data that adheres to the bookSchema
        wishList: [cardSchema],
        // set deckCards to be an array of data that adheres to the bookSchema
        decks: [deckSchema]
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // method to compare and validate password for logging in
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  const User = model('User', userSchema);
  
  module.exports = User;