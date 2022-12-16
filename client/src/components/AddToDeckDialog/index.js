import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItem, ListItemText, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CARD_DECK } from "../../utils/mutations";
import { useState } from "react";

export default function AddToDeckDialog({ card }) {
  const [open, setOpen] = React.useState(false);
  const [deckCard, setDeckCard] = React.useState([]);
  const [addCardToDeck, { deckError }] = useMutation(ADD_CARD_DECK);
  const { loading, userError, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  const handleCloseDecks = () => {
    setOpen(false);
  };

  const handleAddtoDeck = async (card) => {
    try {
      const { data } = await addCardToDeck({
        variables: { ...card },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DialogTitle>{"Select a deck"}</DialogTitle>
      <DialogContent sx={{ maxHeight: "400px" }}>
        <List sx={{ overflowY: "scroll" }} disableScrollLock={false}>
          {userData?.decks?.length > 0 ? (
            userData?.decks?.map((deck) => {
              return (
                <ListItem key={deck.id}>
                  <Tooltip title="Add to this deck">
                    <Button onClick={() => handleAddtoDeck(card)}>
                      <AddCircleOutlineIcon />
                      <ListItemText primary={deck.title} />
                    </Button>
                  </Tooltip>
                </ListItem>
              );
            })
          ) : (
            <ListItemText primary="No decks found" />
          )}
        </List>
      </DialogContent>
    </>
  );
}
