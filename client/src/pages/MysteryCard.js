import React, { useState } from "react";
import { Box, Typography, Grid, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";

const MysteryCard = () => {

  const [mysteryCard, setMysteryCard] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=1;contains=imageUrl;random=true");

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { data } = await response.json();

      const cardData = data.map((card) => ({
        cardId: card.id,
        name: card.name,
        type: card.type,
        text: card.text,
        image: card.imageUrl,
      }));
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
        <Grid item xs={6}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              color: "#fff",
              alignItems: "center",
            }}
          >
            <Typography>
              Cast your query into the void!
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ marginTop: "2em" }}
          >
            Get a Mystery Card
          </Button>
        </Grid>
      </Grid>
      <Box>
            {mysteryCard.map((card) => {
              return (
                <Card key={card.cardId} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image}
                    alt={card.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.name}
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
    </>
  );
};

export default MysteryCard;
