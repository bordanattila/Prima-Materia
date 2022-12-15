import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        wishList {
            _id
            cardId
            name
            type
            text
            image
        }
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