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

export const CreateDeck = () => {
  const [title, setTitle] = useState("");

  const [createDeck, { error }] = useMutation(CREATE_DECK);
  const handleCreate = async (event) => {
    try {
      const { data } = await createDeck({
        variables: { title },
      });
      setTitle("");
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
          <Button
            variant="contained"
            sx={{
              minWidth: "10px",
              maxWidth: "150px",
              padding: "6px",
            }}
            onClick={() =>
              handleCreate().handleClick({
                vertical: "top",
                horizontal: "center",
              })
            }
          >
            <Link to={"/search"} style={linkStyle}>
              Create Deck
            </Link>
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CreateDeck;
