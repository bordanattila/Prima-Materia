const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    // Queries:
    Query: {
    // me
      me: async (parent, args, context) => {
        // check if users exist
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );
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
    // login logout
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError("No user with this email found!");
            }
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError("Incorrect password")
            }

            const token = signToken(user);
            return { token, user };
        },
    // TODO: addCardToWishlist
        addCardToWishlist: async (parent, {}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { }}//TODO: Add 
                )
            }
        }
    // addCardToDeck

    // createDeck

    // removeCardList

    // removeCardDeck
    

    }
}


