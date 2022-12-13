
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

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

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

function CurrentDecks ({ currentPage, handlePageChange }) {

    

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

                    {/* <Button variant="contained"
                        onClick={() => handlePageChange("CreateDeck")}
                        className={currentPage === "CreateDeck"}
                        sx={{
                            minWidth: "10px",
                            maxWidth: "150px",
                            padding: "6px"
                        }}>Add New Deck</Button> */}
                         <BottomNavigation
          showLabels
          currentPage={"CreateDeck"}
          onClick={(event, newValue) => {
            handlePageChange("CreateDeck");
          }}
        >
          <BottomNavigationAction label="Add New Deck" />
          
        </BottomNavigation>
                </Box>
            </Container>
        </>
    );
}
export default CurrentDecks;