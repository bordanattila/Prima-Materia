import React, { useState } from "react";
import { Container, TextField, Box, Button, Snackbar } from "@mui/material";
import { styled } from "@mui/system";
import { useMutation } from "@apollo/client";
import { CREATE_DECK } from "../utils/mutations";
import { Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

// styling input field
const DeckTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "teal",
      maxWidth: "600px",
      minWidth: "200px",
      marginRight: "20px",
    },
    "&:hover fieldset": {
      borderColor: "teal",
    },
  },
});

// styling button
const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CreateDeck = () => {

  // Create state for sncakbar
  const [state, setState] = React.useState({
    openagain: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, openagain } = state;

  const [open, setOpen] = React.useState(false);
  const [deckName, setDeckName] = useState("")
  const handleClick = () => {
    setOpen(true);

  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const button = (
    <React.Fragment>
      <Button variant="contained"

        sx={{
          minWidth: "10px",
          maxWidth: "150px",
          padding: "6px",
        }}
        onClick={() => {
          handleCreate();
          handleClick({
            vertical: 'top',
            horizontal: 'center',
          });
          setDeckName(title)
        }}
      > Create Deck
        {/* <Link to={"/search"} style={linkStyle}>
                    Create Deck
                </Link> */}
      </Button>
    </React.Fragment>
  )

  const [title, setTitle] = useState("");

  const [createDeck, { error }] = useMutation(CREATE_DECK);
  const handleCreate = async (event) => {
    try {
      const { data } = await createDeck({
        variables: { title: title },
      });
      setTitle("");
      window.location.assign('/decks');
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          margin: "10em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            textAlign: "center",
            gridTemplateColumns: { sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              color: "white",
            }}
          >
            Create a Deck
          </h3>
          <DeckTextField
            sx={{
              input: { color: "teal" },
              label: { color: "teal" },
            }}
            id="outlined"
            label="Name your Deck"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {button}


          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {deckName} was successfully created!
            </Alert>
          </Snackbar>

        </Box>
      </Container>
    </>
  );
};

export default CreateDeck;
