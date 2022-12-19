import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_CARD_LIST = gql`
  mutation addCardToWishList(
    $cardId: ID!
    $name: String!
    $type: String!
    $text: String!
    $image: String!
  ) {
    addCardToWishList(
      cardId: $cardId
      name: $name
      type: $type
      text: $text
      image: $image
    ) {
      wishList {
        _id
        cardId
        name
        type
        text
        image
      }
    }
  }
`;

export const ADD_CARD_DECK = gql`
  mutation addCardToDeck($cardData: CardInput!, $deckId: ID!) {
    addCardToDeck(cardData: $cardData, deckId: $deckId) {
      decks {
        _id
        title
        cards {
          _id
          cardId
          name
          type
          text
          image
        }
      }
    }
  }
`;

export const CREATE_DECK = gql`
  mutation createDeck($title: String!) {
    createDeck(title: $title) {
      decks {
        _id
        title
        cards {
          _id
          cardId
          name
          type
          text
          image
        }
      }
    }
  }
`;

export const REMOVE_CARD_LIST = gql`
  mutation removeCardFromList($idCard: ID!) {
    removeCardFromList(idCard: $idCard) {
      wishList {
        _id
      }
    }
  }
`;

export const REMOVE_CARD_DECK = gql`
  mutation removeCardFromDeck($idDeck: ID!, $idCard: ID!) {
    removeCardFromDeck(idDeck: $idDeck, idCard: $idCard) {
      decks {
        _id
        cards {
          _id
        }
    }
  }
}
`;

export const REMOVE_DECK = gql`
  mutation removeDeck($_id: ID!, $idDeck: ID!) {
    removeDeck(_id: $_id, idDeck: $idDeck) {
      _id
      decks {
        _id     
      }
    }
  }
`;
