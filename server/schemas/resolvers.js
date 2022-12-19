const { AuthenticationError } = require("apollo-server-express");
const { User, Deck } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check if users exist
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate("decks")
          .select("-__v -password");
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deck: async (parent, { _id }, context) => {
      if (context.user) {
        return Deck.findOne({ _id });
      }
      throw new AuthenticationError("You need to be logged in to view deck!");
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    addCardToWishList: async (parent, args, context) => {
      // args --> {cardId: '1234okpjf0-23', name: 'cardName', type: 'theType', ...}
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { wishList: { ...args } } },
          { new: true }
        ).populate({
          path: "decks",
          populate: {
            path: "cards",
          },
        });
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addCardToDeck: async (parent, { cardData, deckId }, context) => {
      if (context.user) {
        //Note: Card model contains deckId, but typeDefs doesn't b/c we currently are not using deckId
        const deck = await Deck.findOneAndUpdate(
          { _id: deckId },
          { $addToSet: { cards: { ...cardData } } }, //Note: cardId is the id given to us from the Card API
          { new: true }
        );
        const user = await User.findOne({ _id: context.user._id }).populate({
          path: "decks",
          populate: {
            path: "cards",
          },
        });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    createDeck: async (parent, { title }, context) => {
      if (context.user) {
        const newDeck = await Deck.create({ title });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { decks: newDeck._id } },
          { new: true }
        ).populate("decks");

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //  Retrieve the _id key from a Card and use it for the "{_id}" parameter
    removeCardFromList: async (parent, { idCard }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { wishList: { cardId: idCard } } },//If the card in wishList matches the idCard value from cardId, then remove card from the wishList
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //      Retrieve the _id key from a deck and use it for idDeck. Retrieve the _id key for a card and use it for idCard
    removeCardFromDeck: async (parent, { idDeck, idCard }, context) => {
      if (context.user) {
        const updatedDeck = await Deck.findOneAndUpdate(
          { _id: idDeck },
          { $pull: { cards: { _id: idCard } } },
          { new: true }
        );
        const user = await User.findOne({ _id: context.user._id }).populate({
          path: "decks",
          populate: {
            path: "cards",
          },
        });
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeDeck: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { decks: _id } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },
};

module.exports = resolvers;
