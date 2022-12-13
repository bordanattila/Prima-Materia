import React, { useState } from "react";
import { Box, Typography, Grid, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";

import { mysteryCardSearch } from "../utils/API";


export const MysteryCard = () => {

  const [mysteryCard, setMysteryCard] = useState([]);

  const handleSubmit = async () => {
    // event.preventDefault();
    // console.log(event);
    try {
      const response = await mysteryCardSearch();

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      console.log(response);
      const { cards } = await response.json();
      console.log(cards);
      const cardData = cards.map((card) => ({
        cardId: card.id,
        name: card.name,
        type: card.type,
        text: card.text,
        image: card.imageUrl,
      }));
      console.log(cardData);
      setMysteryCard(cardData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        justify="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid item xs={4}>
          <Box
          flexDirection="column"
            sx={{
              display: "flex",
              color: "#fff",
              alignItems: "center",
            }}
          >
            <Typography>
              Cast your query into the void!
            </Typography>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
              sx={{ marginTop: "2em" }}
            >
              Get a Mystery Card
            </Button>
          </Box>
          {mysteryCard.map((card) => {
              return (
                <Card key={card.cardId} sx={{ padding: "1.5em", margin: "5px", backgroundColor: "#424242", color: "#fff",  marginTop: "2em" }}>
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.name}
                    </Typography>
                    <Typography variant="body2" color="#eeeeee">
                      {card.text}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* these buttons need functionality */}
                    <Button size="small" color="secondary">Add to Wishlist</Button>
                    <Button size="small">Add to a Deck:</Button>
                  </CardActions>
                </Card>
              );
            })}

        </Grid>
      </Grid>
    </>
  );
};

export default MysteryCard;
