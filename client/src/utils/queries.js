import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        wishlist {
            cardId
            name
            type
            text
            color
            image
        }
        decks {
            deckId
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