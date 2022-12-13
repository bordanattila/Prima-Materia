import React, { useState } from "react";
import { Box, Typography, Grid, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";

const MysteryCard = () => {

  const [mysteryCard, setMysteryCard] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.magicthegathering.io/v1/cards?pageSize=1;contains=imageUrl;random=true`);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { card } = await response.json();

      const cardData = card.map((card) => ({
        cardId: card.id,
        name: card.name,
        type: card.type,
        text: card.text,
        image: card.imageUrl,
      }));
      setMysteryCard(cardData);
      return (
        <Card key={mysteryCard.cardId} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={mysteryCard.image}
            alt={mysteryCard.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {mysteryCard.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mysteryCard.text}
            </Typography>
          </CardContent>
          <CardActions>
            {/* these buttons need functionality */}
            <Button size="small">Add to Wishlist</Button>
            <Button size="small">Add to a Deck:</Button>
          </CardActions>
        </Card>
      );
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
    </>
  );
};

export default MysteryCard;
