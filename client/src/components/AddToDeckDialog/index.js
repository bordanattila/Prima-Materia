import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { List, ListItem, ListItemText, Tooltip, Snackbar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CARD_DECK } from "../../utils/mutations";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddToDeckDialog({ card }) {
  const [open, setOpen] = React.useState(false);
  const [deckCard, setDeckCard] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [addCardToDeck, { deckError }] = useMutation(ADD_CARD_DECK);
  const { loading, userError, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleAddtoDeck = async (card, deckId) => {
    console.log(card);
    try {
      const { data } = await addCardToDeck({
        variables: { cardData: card, deckId: deckId },
      });
      setOpenAlert(true);
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
                    <Button onClick={() => handleAddtoDeck(card, deck._id)}>
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
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Card added to deck!
          </Alert>
        </Snackbar>
      </DialogContent>
    </>
  );
}
