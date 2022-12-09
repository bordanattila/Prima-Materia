import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($_id: ID!, $username: String!, $email: String!, $password: String!) {
    createUser(_id: $_id, username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_CARD_LIST = gql`
  mutation addCardToWishList($cardId: Int!, $name: String!, $type: String!, $text: String!, $color: [String]!, $image: String!) {
    addCardToWishList(cardId: $cardId, name: $name, type: $type, text: $text, color: $color, image: $image) {
      wishList {
        cardId
        name
        type
        text
        color
        image
      }
    }
  }
`;

export const ADD_CARD_DECK = gql`
  mutation addCardToDeck($_id: ID!, $cardId: ID!, $name: String!, $type: String!, $text: String!, $color: [String]!, $image: String!) {
    addCardToDeck(_id: $_id, cardId: $cardId, name: $name, type: $type, text: $text, color: $color, image: $image) {
      decks {
        _id
        title
        cards {
          cardId
          name
          type
          text
          color
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
        cards
      }
    }
  }
`;

export const REMOVE_CARD_LIST = gql`
mutation removeCardFromList($cardId: Int!) {
  removeCardFromList(cardId: $cardId) {
    wishList {
      cardId
    }
  }
}
`;

export const REMOVE_CARD_DECK = gql`
mutation removeCardFromDeck($_id: ID!) {
    removeCardFromDeck(_id: $_id) {
    decks {
        _id
    }
  }
}
`;