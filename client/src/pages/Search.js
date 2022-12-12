import { borderRadius, margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { searchMagicCards } from "../utils/API";
import { alpha, styled } from '@mui/material/styles';

import {
    Container,
    TextField,
    Box,
    Autocomplete,
    FormControlLabel,
    Checkbox,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";

import FormControl from '@mui/material/FormControl';

const SearchBox = styled(TextField)({
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'teal',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'teal',
        },
        '&:hover fieldset': {
            borderColor: 'teal',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'teal',
        },
    },
});

const AutoSearch = styled(Autocomplete)({
    '& label.Mui-focused': {
        color: '#fff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'teal',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'teal',
        },
        '&:hover fieldset': {
            borderColor: 'teal',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'teal',
        },
    },
});

const cardTypes = [
    { label: 'Creatures' },
    { label: 'Enchantments' },
    { label: 'Lands' },
    { label: 'Sorceries' },
    { label: 'Artifacts' },
    { label: 'Instants' },

]


export const Search = () => {

    const [searchedCards, setSearchedCards] = useState([]);


    // useEffect(() => {
    //     if(inputData) {
    //         return () => setSearchedCards(cardData);
    //     }
    // }, []);

    if (!cardFetch) {
        return false;
    }
    console.log(cardFetch);

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        if (!cardFetch) {
            return false;
        }

        try {

            const response = await searchMagicCards(cardFetch);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { cards } = response.json();

            const cardData = cards.map((card) => ({
                cardId: card.id,
                name: card.name,
                type: card.type,
                text: card.text,
                image: card.imageUrl,
            }));

            setSearchedCards(cardData);
            // we may not want to clear the form for the user in this setting -- they may want to run the same search again, as it only returns a small, random sample of the many possible matches.

        } catch (err) {
            console.error(err);
        }

    };
    return (
        <>
            <Container maxWidth="md" sx={{ margin: "10em" }}>
                <h2 style={{ color: '#fff' }}>Search for Cards</h2>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr', md: '1fr 1fr 1fr', },
                        gap: 2,
                    }}
                >
                    {/* search by card name */}
                    <SearchBox label="Search by Card Name" id="cardName" sx={{ input: { color: '#fff', }, label: { color: '#fff', } }} />

                    {/* search by card type */}
                    <AutoSearch
                        disablePortal
                        id="cardType"
                        options={cardTypes}
                        sx={{ input: { color: '#fff', }, label: { color: '#fff', } }}
                        renderInput={(params) => <TextField {...params} label="Card Type" />}
                    />

                    {/* search by subtype */}
                    <SearchBox label="Search by Subtype (dragon, cat, zombie, squirrel, etc.)" id="subType" sx={{ input: { color: '#fff', }, label: { color: '#fff', } }} />

                    {/* checkboxes for colors to search */}
                    <Box sx={{ backgroundColor: '#3e2723', padding: '2em', paddingTop: '5px', borderRadius: '8px', textAlign: 'left', color: '#fff' }}>
                        <h3>Select Card Colors:</h3>
                        <hr></hr>
                        <FormControlLabel control={<Checkbox defaultUnchecked color="success" />} label="White" sx={{ color: '#fff' }} />
                        <FormControlLabel control={<Checkbox defaultUnchecked color="success" />} label="Blue" sx={{ color: '#fff' }} />
                        <FormControlLabel control={<Checkbox defaultUnchecked color="success" />} label="Green" sx={{ color: '#fff' }} />
                        <FormControlLabel control={<Checkbox defaultUnchecked color="success" />} label="Red" sx={{ color: '#fff' }} />
                        <FormControlLabel control={<Checkbox defaultUnchecked color="success" />} label="Black" sx={{ color: '#fff' }} />
                    </Box>

                </Box>

                {/* submit button */}
                <Button variant="contained" color="success" sx={{ marginTop: "2em" }} onClick={() => handleFormSubmit(inputData)}>Submit</Button>
                {/* <button style={{ color: '#fff', margin: '20em', padding: '2em', backgroundColor: 'green', borderRadius: '8px' }} onClick={() => searchMagicCards()}>Test API</button> */}

                {/* results of search (map all cards returned) */}
                <Box
                    component="results"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr', md: '1fr 1fr 1fr', },
                        gap: 2,
                    }}
                >
                    {searchedCards.map((card) => {
                        return (
                            <Card key={card.cardId} sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={card.image}
                                    alt={card.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.text}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* these buttons need functionality */}
                                    <Button size="small">Add to Wishlist</Button>
                                    <Button size="small">Add to a Deck:</Button>
                                </CardActions>
                            </Card>
                        )
                    })}

                </Box>
            </Container >
        </>
    )
}

export default Search;