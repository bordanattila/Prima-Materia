import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  createTheme,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

export default function AddToDeckDialog() {
  const [open, setOpen] = React.useState(false);
  const handleCloseDecks = () => {
    setOpen(false);
  };

  const { loading, error, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

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
                    <Button>
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
