
import React from 'react';
import {
    Container,
    TextField,
    Box,
    Autocomplete,
    CardMedia,
    Card,
    Button,
    CardContent
} from "@mui/material";
import { styled } from '@mui/system';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
// import DeckLayout from './Decks';
import { QUERY_ME } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';


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
    const { loading, error, data } = useQuery(QUERY_ME);

    const userData = data?.me || [];

    if (error) return (
        <h1 style={{
            color: "white",
            textAlign: "center"
        }}>Error</h1>
    );

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
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                >
                    {userData?.decks?.length > 0 ?
                        <section style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 6,
                        }}
                        > {userData?.decks?.map((deck) => {
                            return (
                                <Card sx={{
                                    background: "#424242",
                                    minWidth: "100px",
                                    maxWidth: "200px",
                                    minHeight: "100px",
                                    maxHeight: "275px",
                                    padding: "6px"
                                }}>
                                    <CardContent

                                        sx={{
                                            color: "white",
                                            textAlign: "center",
                                            minWidth: "10px",
                                            maxWidth: "150px",
                                            minHeight: "10px",
                                            maxHeight: "150px",
                                            padding: "6px"
                                        }}>
                                        {deck.title}

                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        height="225"
                                        width="150"
                                        image="https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__imagepagezoom/img/KuHBP_jVjw_8gbieS8skQD_-_Ho=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic163749.jpg"
                                        alt="deck cover"
                                    />
                                </Card>
                            )
                        })}

                        </section> : <h1>No Decks found</h1>}
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