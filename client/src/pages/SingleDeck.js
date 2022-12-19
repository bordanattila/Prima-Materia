import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_DECK, QUERY_ME } from "../utils/queries";
import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import SingleDeckCard from "../components/SingleDeckCard";

const SingleDeck = () => {
  const { deckId } = useParams();

  const { loading, error, data } = useQuery(
    deckId ? QUERY_SINGLE_DECK : QUERY_ME,
    {
      variables: { _id: deckId },
    }
  );

  const deckData = data?.me || data?.deck || data?.cards || [];
  console.log("this is data");
  console.log(data);
  console.log("this is deck data");
  console.log(deckData);
  console.log("this is deck id");
  console.log(deckData._id);
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
      <h1 style={{ color: "#fff", textAlign: "center" }}>{deckData.title}</h1>
      {deckData?.cards?.length > 0 ? (
        <Grid container>
          {deckData?.cards?.map((card) => {
            return (
              <Grid item xs={12} sm={6} md={4} sx={{ maxHeight: "580px" }}>
                <SingleDeckCard card={card} deckId={deckData._id} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h2 style={{ color: "#fff" }}>This deck has no cards.</h2>
      )}
    </Container>
  );
};

export default SingleDeck;
