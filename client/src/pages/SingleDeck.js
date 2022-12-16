import React from "react";
import Auth from '../utils/auth';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_CARD_DECK } from "../utils/mutations";
import {
  Container,
  Grid
} from "@mui/material"

import SearchCard from "../components/Card";

const SingleDeck = () => {

    const { deckId } = useParams();

    const { loading, error, data } = useQuery(
        deckId ? QUERY_SINGLE_DECK : QUERY_ME,
        {
          variables: { deckId: deckId },
        }
      
    );

    const userData = data?.me || data?.deck || [];

  const [removeCardFromDeck] = useMutation(REMOVE_CARD_DECK);

  //Error handling if user is not logged in
  if (error) {
    console.log(error)
    return <h3
      style={{
        color: "#fff",
        textAlign: "center",
      }}>{error.toString().replace("ApolloError: ", "")}</h3>
  }

  const handleDeleteCardDeck = async (idCard) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const { data } = await removeCardFromDeck({
        variables: { idCard: idCard }
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
    <h2 style={{ color: "#fff" }}>Search for Cards</h2>
    <Grid container>
          {searchedCards.map((card) => {
            return (
              <Grid item xs={12} sm={6} md={4} sx={{ maxHeight: "580px" }}>
                <SearchCard card={card} />
              </Grid>
            );
          })}
        </Grid>
      </Container>

  )
};

export default SingleDeck;
