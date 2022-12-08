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
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_CARD_LIST = gql`
  mutation addCardToWishList($cardId: ID!, $name: String!, $type: String!, $text: String!, $color: [String]!, $image: String!) {
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
  mutation addCardToDeck($cardId: ID!, $name: String!, $type: String!, $text: String!, $color: [String]!, $image: String!) {
    addCardToDeck(cardId: $cardId, name: $name, type: $type, text: $text, color: $color, image: $image) {
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

export const CREATE_DECK = gql`
  mutation createDeck($title: String!) {
    addCardToDeck(title: $title) {
      decks {
        deckId
        title
        cards
      }
    }
  }
`;

export const REMOVE_CARD_LIST = gql`
mutation removeCardFromList($cardId: ID!) {
removeBook(cardId: $cardId) {
    wishlist {
      cardId
    }
  }
}
`;

export const REMOVE_CARD_DECK = gql`
mutation removeCardFromDeck($deckId: ID!) {
    removeCardFromDeck(deckId: $deckId) {
    wishlist {
        deckId
    }
  }
}
`;