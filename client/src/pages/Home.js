import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const Home = () => {
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
            sx={{
              display: "flex",
              color: "#fff",
              alignItems: "center",
            }}
          >
            <Typography>
              Prima Materia is a site dedicated to fans of Magic The Gathering.  You can search for cards, add cards to a wishlist, and create virtual decks. Login or sign up to get started! 
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
