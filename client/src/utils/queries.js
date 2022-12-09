import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        wishList {
            cardId
            name
            type
            text
            color
            image
        }
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