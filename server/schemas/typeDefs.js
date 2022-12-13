const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  wishList: [Card]
  decks: [Deck]
}

type Card {
  _id: ID
  cardId: ID
  name: String
  type: String
  text: String
  color: [String]
  image: String
}

type Auth {
  token: ID!
  user: User
}

type Deck {
  _id: ID
  title: String
  cards: [Card]
}

type Query {
  me: User
  deck(_id: ID!): Deck
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addCardToWishList(cardId: ID!, name: String!, type: String!, text: String!, color: [String]!, image: String!): User
  addCardToDeck(_id: ID!, cardId: ID!, name: String!, type: String!, text: String!, color: [String]!, image: String!): User
  createDeck(title: String!): User
  removeCardFromList(idCard: ID!): User
  removeCardFromDeck(idDeck: ID!, idCard: ID!): User
}
`;

module.exports = typeDefs;