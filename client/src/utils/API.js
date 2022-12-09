import { mtg } from 'mtgsdk';

export const searchMagicCards = () => {
    return mtg.card.all({ supertypes: 'legendary', types: 'creature', colors: 'red,white' })
    .on('data', function (card) {
        console.log(card.name)
    });
}