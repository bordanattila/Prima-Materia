const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email
  wishList: [Card]
  decks: [Deck]
}

type Card {
  cardId: ID
  name: String
  type: String
  text: String
  color: String
  image: [String]
}

type Deck {
  deckId: ID
  title: String
  cards: [Card]
}

type Query {
  me: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addCardToWishList(cardId: ID!, name: String!, type: String!, text: String!, color: [String]!, image: String!): User
  addCardToDeck(cardId: ID!, name: String!, type: String!, text: String!, color: [String]!, image: String!): User
  createDeck(title: String!): User
  removeCardFromList(cardId: ID!): User
  removeCardFromDeck(deckId: ID!): User
}
`;

module.exports = typeDefs;