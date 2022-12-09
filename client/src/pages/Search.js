import React from "react";
import { searchMagicCards } from "../utils/API";

export const Search = () => {


    // const handleFormSubmit = async (event) => {

    //     event.preventDefault();

    //     if (!searchInput) {
    //         return false;
    //     }

    //     try {

            const response =  searchMagicCards();

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { cards } =  response.json();

            const cardData = cards.map((card) => ({
                cardId: card.id,
                name: card.name,
                type: card.type,
                text: card.text,
                image: card.image,
            }));

            //check our data out
            console.log(cardData);

    //     } catch (err) {
    //         console.error(err);
    //     }

    // };
    // return (
    //     <>
    //     </>
    // )
}

export default Search;