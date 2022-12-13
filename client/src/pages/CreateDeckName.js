import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Box,
    Autocomplete,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material";
import { styled } from '@mui/system';
import { useMutation } from '@apollo/client';
import { CREATE_DECK } from '../utils/mutations';
import { Link } from 'react-router-dom';

// styling input field
const DeckTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
    }
})

// styling button 
const linkStyle = {
    textDecoration: "none",
    color: "white"
}

export const CreateDeck = () => {
    const [title, setTitle] = useState('');

    const [createDeck, { error }] = useMutation(CREATE_DECK);
    const handleCreate = async (event) => {
        // event.preventDefault();

        try {
            const { data } = await createDeck({
                variables: { title },
            });
            setTitle('');
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <Container maxWidth="md"
                sx={{
                    margin: "10em",
                }}>
                <Box component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr', md: '1fr 1fr 1fr', },
                        gap: 2,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h3 style={{
                        color: "white",
                        textAlign: "center"
                    }}
                    >Create a Deck</h3>
                    <DeckTextField
                        sx={{
                            input: { color: "white", },
                            label: { color: "white", },
                        }}
                        id="outlined"
                        label="Name your Deck"
                        variant="outlined"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <Button variant="contained"
                        sx={{
                            minWidth: "10px",
                            maxWidth: "150px",
                            padding: "6px"
                        }}
                        onClick={() => handleCreate()}
                        >
                            <Link to={"search"} style={linkStyle}>
                            Create Deck
                        </Link>
                        </Button>
                </Box>
            </Container>
        </>
    )
}

export default CreateDeck;