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

const decks = [
  "deck1",
  "deck2",
  "deck3",
  "deck4",
  "deck5",
  "deck6",
  "deck7",
  "deck8",
  "deck9",
  "deck10",
  "deck11",
  "deck12",
];

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <DialogTitle>{"Select a deck"}</DialogTitle>
      <DialogContent sx={{ maxHeight: "400px" }}>
        <List sx={{ overflowY: "scroll" }} disableScrollLock={false}>
          {decks.map((deck) => (
            <ListItem key={deck}>
              <Tooltip title="Add to this deck">
                <Button>
                  <AddCircleOutlineIcon />
                  <ListItemText primary={deck} />
                </Button>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </>
  );
}
