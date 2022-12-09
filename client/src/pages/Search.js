import { borderRadius, margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { searchMagicCards } from "../utils/API";

export const Search = () => {

//     const [searchedCards, setSearchedCards] = useState([]);


//     useEffect(() => {
//         if(cardData) {
//             return () => setSearchedCards(cardData);
//         }
//     }, []);

//     if (!cardData) {
//         return false;
//     }
//     console.log(cardData);

//     const handleFormSubmit = async (event) => {

//         event.preventDefault();

//     if (!searchInput) {
//         return false;
//     }

//     try {

//     const response = searchMagicCards();

//     if (!response.ok) {
//         throw new Error('something went wrong!');
//     }

//     const { cards } = response.json();

//     const cardData = cards.map((card) => ({
//         cardId: card.id,
//         name: card.name,
//         type: card.type,
//         text: card.text,
//         image: card.image,
//     }));

// } catch (err) {
//     console.error(err);
// }

    // };
return (
    <>
        <button style={{color: 'white', margin: '40em', padding: '2em', backgroundColor: 'green', borderRadius: '8px'}} onClick={() => searchMagicCards()}>Test API</button>
    </>
)
}

export default Search;