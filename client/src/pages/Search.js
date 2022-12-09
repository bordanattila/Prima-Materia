import { borderRadius, margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { searchMagicCards } from "../utils/API";
import { alpha, styled } from '@mui/material/styles';

import { Container, TextField, Box, Typography, inputBase, inputLabel, formControl } from "@mui/material";

import FormControl from '@mui/material/FormControl';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

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
    //         image: card.imageUrl,
    //     }));

    // } catch (err) {
    //     console.error(err);
    // }

    // };
    return (
        <>
            <Container maxWidth="lg" sx={{ margin: "10em" }}>
                <h2 style={{ color: '#fff' }}>Search for Cards</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-secondary" label="Card Name" variant="outlined" color="secondary" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </Box>
                {/* <button style={{ color: '#fff', margin: '20em', padding: '2em', backgroundColor: 'green', borderRadius: '8px' }} onClick={() => searchMagicCards()}>Test API</button> */}
            </Container >
        </>
    )
}

export default Search;