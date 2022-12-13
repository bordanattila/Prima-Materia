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

export const CreateDeck = () => {
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
                        />
                    <Button variant="contained"
                    sx={{
                        minWidth: "10px",
                        maxWidth: "150px",
                        padding: "6px"
                    }}>Create Deck</Button>
                </Box>
            </Container>
        </>
    )
}

export default CreateDeck;