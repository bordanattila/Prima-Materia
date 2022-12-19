import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Container, Grid } from "@mui/material";

import SingleCard from "../components/SingleCard";

const Wishlist = () => {
  const { loading, error, data } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  //Error handling if user is not logged in
  if (error) {
    console.log(error);
    return (
      <h3
        style={{
          color: "#fff",
          textAlign: "center",
        }}
      >
        {error.toString().replace("ApolloError: ", "")}
      </h3>
    );
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <Container maxWidth="md" sx={{ margin: "10em" }}>
      <h3
        style={{
          color: "#fff",
          textAlign: "center",
        }}
      >
        Wishlist
      </h3>
      <Grid container>
        {userData.wishList.map((card) => {
          const cardData = {
            cardId: card.cardId,
            name: card.name,
            type: card.type,
            text: card.text,
            image: card.image,
          };
          return (
            <Grid item xs={12} sm={6} md={4} sx={{ maxHeight: "580px" }}>
              <SingleCard card={cardData} wishList={userData.wishList} />;
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Wishlist;
