
import React, { useState } from 'react';
import {
    Container,
    Box,
    ThemeProvider,
    createTheme,
    CardMedia,
    Card,
    Button,
    Typography,
    Tooltip,
    CardContent,
    IconButton
} from "@mui/material";
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { REMOVE_DECK } from "../../utils/mutations";

// styling button 
const linkStyle = {
    textDecoration: "none",
    color: "black"
}

const cardTheme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#424242",
                    border: "solid 2px teal",
                },
            },
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: ".75rem",
                    "&:last-child": {
                        paddingBottom: ".75rem",
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    fontSize: "large",
                },
            },
        },
    },
});

function CurrentDecks() {

    const { loading, error, data } = useQuery(QUERY_ME);
    const [removeDeck, {err}] = useMutation(REMOVE_DECK);
    const [_id, set_id] = useState("");

    const userData = data?.me || [];

    if (error) return (
        <h1 style={{
            color: "white",
            textAlign: "center"
        }}>You need to be logged in</h1>
    );

    const handleDelete = async (event) => {
        try {
          const { data } = await removeDeck({
            variables: { _id },
          });
          
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <>
            <Container maxWidth="md"
                sx={{
                    margin: "10em",
                }}>
                <h1 style={{
                    color: "white",
                    textAlign: "center"
                }}
                >Your Decks</h1>
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
                            gap: 40,
                        }}
                        > {userData?.decks?.map((deck) => {
                            return (
                                <ThemeProvider theme={cardTheme}>
                                    <Card sx={{ color: "#fff", width: "250px" }}>
                                        <CardContent>
                                            <CardMedia component="img" image="https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__imagepagezoom/img/KuHBP_jVjw_8gbieS8skQD_-_Ho=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic163749.jpg" />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    sx={{
                                                        fontWeight: "bold",
                                                        height: "40px",
                                                        size: "2vw",
                                                    }}
                                                    component="div"
                                                >
                                                    {deck.title}
                                                </Typography>
                                            </CardContent>
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    gap: 160,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Tooltip title="Edit deck" >
                                                    <Link
                                                        className="custom-link"
                                                        to={`/decks/${deck._id}`}
                                                    >
                                                        <ModeEditIcon />
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip title="Delete deck" >
                                                    <IconButton onClick={handleDelete}>
                                                        <DeleteIcon 
                                                        className="custom-link"
                                                        sx={{variant: "filled"}}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </ThemeProvider>
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