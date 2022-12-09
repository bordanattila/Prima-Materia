const { AuthenticationError } = require("apollo-server-express");
const { User, Deck } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    // Queries:
    Query: {
    // me
      me: async (parent, args, context) => {
        // check if users exist
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
          return userData;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    },

    // Mutations:
    Mutation: {
    // createUser
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
    // login 
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError("No user with this email found!");
            }
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError("Incorrect password");
            }

            const token = signToken(user);
            return { token, user };
        },
    // addCardToWishlist
        addCardToWishList: async (parent, args, context) => {
            // args --> {cardId: '1234okpjf0-23', name: 'cardName', type: 'theType', ...}
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { wishList: { ...args } }},
                    { new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    // addCardToDeck
        addCardToDeck: async (parent, {deckId, cardId, name, type, text, color, image}, context) => {
            if (context.user) {
                const deck = await Deck.findOneAndUpdate(
                    {deckId},
                    {$addToSet: { cards: {cardId, name, type, text, color, image} } },
                    {new: true}
                    );
                const user = await User.findOne(
                    {_id: context.user._id},
                )
                return user;
            }
            throw new AuthenticationError("You need to be logged in!")
        },
    // TODO: createDeck
        createDeck: async (parent, {title}, context) => {
            if(context.user) {
                const newDeck = await Deck.create({title});//NOTE: May need to include other parameters in order to create b/c of Deck model requirements
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: {decks: newDeck}},
                    {new: true}
                );

                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },

    // removeCardFromList
         removeCardFromList: async (parent, {cardId}, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {wishList: {cardId: cardId}}},
                    {new: true}
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
         },

//     removeCardFromDeck
         removeCardFromDeck: async (parent, {deckId, cardId}, context) => {//Note: May need to figure out how to assign a deckId to the Deck or retrieve _id from Deck
            if(context.user) {
                const updatedDeck = await Deck.findOneAndUpdate(
                    {deckId: deckId},
                    {$pull: {cards: {cardId: cardId}}},
                    {new: true}
                );
                const user = await User.findOne(
                    {_id: context.user._id},
                );
                return user;
            }
            throw new AuthenticationError("You need to be logged in!");
         } 
    }
}

module.exports = resolvers;