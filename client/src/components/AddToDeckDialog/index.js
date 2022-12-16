import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItem, ListItemText, Tooltip, Snackbar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CARD_DECK } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function AddToDeckDialog({ card }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <DeckList card={card} />
    </SnackbarProvider>
  );
}

function DeckList({ card }) {
  const [addCardToDeck, { deckError }] = useMutation(ADD_CARD_DECK);
  const { loading, userError, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  const { enqueueSnackbar } = useSnackbar();

  const handleAddtoDeck = async (card, deck) => {
    console.log(card);
    try {
      const { data } = await addCardToDeck({
        variables: { cardData: card, deckId: deck._id },
      });
      enqueueSnackbar(`Added to ${deck.title}`, { variant: "success" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DialogTitle>{"Select a deck"}</DialogTitle>
      <DialogContent sx={{ maxHeight: "400px" }}>
        <List sx={{ overflowY: "scroll" }}>
          {userData?.decks?.length > 0 ? (
            userData?.decks?.map((deck) => {
              return (
                <ListItem key={deck._id}>
                  <Tooltip title="Add to this deck">
                    <Button onClick={() => handleAddtoDeck(card, deck)}>
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
