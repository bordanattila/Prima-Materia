
import React from 'react';
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

function CurrentDecks() {
    return (
        <>
            <Container maxWidth="md"
                sx={{
                    margin: "10em",
                }}>
                <h3 style={{
                    color: "white",
                    textAlign: "center"
                }}
                >Your Decks</h3>
                <Box component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr', md: '1fr 1fr 1fr', },
                        gap: 2,
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <p style={{
                        color: "white",
                    }}>Deck 1</p>
                    <p style={{
                        color: "white",
                    }}>Deck 2</p>

                    <Button variant="contained"
                        sx={{
                            minWidth: "10px",
                            maxWidth: "150px",
                            padding: "6px"
                        }}>
                        <Link to={"/decks/create"} style={linkStyle}>
                            Add new deck
                        </Link>
                    </Button>
                </Box>
            </Container>
        </>
    );
}
export default CurrentDecks;