import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Box,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/system";
import { searchMagicCards } from "../utils/API";
import Auth from "../utils/auth";

function AddToDeck() {
  const [searchedCards, setSearchedCards] = useState([]);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  try {
    const response = searchMagicCards("dragon");

    if (!response.ok) {
      throw new Error("something went wrong!");
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

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          margin: "10em",
        }}
      >
        <h3>Here are your cards to choose from</h3>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1fr", md: "1fr 1fr 1fr" },
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
            );
          })}
        </Box>
      </Container>
    </>
  );
}

export default AddToDeck;
