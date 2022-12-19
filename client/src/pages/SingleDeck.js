import React from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_DECK, QUERY_ME } from "../utils/queries";
import { REMOVE_CARD_DECK } from "../utils/mutations";
import {
  Container,
  Grid
} from "@mui/material"
import { useParams } from 'react-router-dom';

import SingleCard from "../components/SingleDeckCard";

const SingleDeck = () => {

    const { deckId } = useParams();
    
    const { loading, error, data } = useQuery(
      deckId ? QUERY_SINGLE_DECK : QUERY_ME,
      {
        variables: { _id: deckId },
      }
      
      );
      const [removeCardFromDeck] = useMutation(REMOVE_CARD_DECK);

    const userData = data?.me || data?.deck || data?.cards || [];


  //Error handling if user is not logged in
  if (error) {
    console.log(error)
    return <h3
      style={{
        color: "#fff",
        textAlign: "center",
      }}>{error.toString().replace("ApolloError: ", "")}</h3>
  }

  const handleDeleteCardDeck = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    try {
      const { deck } = await removeCardFromDeck({
        variables: { idCard: _id, idDeck: deckId }
      })
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <h2>LOADING...</h2>
  }

  return (
    <Container maxWidth="md" sx={{ margin: "10em" }}>
    <h1 style={{ color: "#fff", textAlign: "center" }}>{userData.title}</h1>
    {userData?.cards?.length > 0 ?
    <Grid container
  
  >
          {userData?.cards?.map((card) => {
            return (
              <Grid item xs={12} sm={6} md={4} sx={{ maxHeight: "580px" }} onClick={() => handleDeleteCardDeck(card._id)}>
                <SingleCard card={card} />
              </Grid>
            );
           })} 
        </Grid> : <h2 style={{ color: "#fff" }}>This deck has no cards.</h2>}
      </Container>

  )
};

export default SingleDeck;
