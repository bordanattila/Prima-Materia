import React, { useState } from "react";
import { searchMagicCards } from "../utils/API";
import { styled } from "@mui/material/styles";
import {
  Container,
  TextField,
  Box,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import SingleCard from "../components/SingleCard";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

const SearchBox = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "teal",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "teal",
    },
    "&:hover fieldset": {
      borderColor: "teal",
    },
    "&.Mui-focused fieldset": {
      borderColor: "teal",
    },
  },
});

const AutoSearch = styled(Autocomplete)({
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "teal",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "teal",
    },
    "&:hover fieldset": {
      borderColor: "teal",
    },
    "&.Mui-focused fieldset": {
      borderColor: "teal",
    },
  },
});

const options = [
  { title: "creature" },
  { title: "enchantment" },
  { title: "land" },
  { title: "sorcery" },
  { title: "artifact" },
  { title: "instant" },
  { title: "planeswalker" },
];

export const Search = () => {
  const [searchedCards, setSearchedCards] = useState([]);
  const [nameInput, setNameInput] = useState([]);
  const [typeInput, setTypeInput] = useState({ title: "" });
  const [subtypeInput, setSubtypeInput] = useState([]);
  const [superTypeInput, setSuperTypeInput] = useState([]);
  const [setInput, setSetInput] = useState([]);
  const [colorInput, setColorInput] = useState([]);
  const { loading, data, error } = useQuery(QUERY_ME);

  let userData = data?.me || {};
  //If the user is not logged in, create a user object with an empty wishList
  if (error) {
    userData = {
      wishList: [],
    };
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await searchMagicCards(
        nameInput,
        typeInput.title,
        subtypeInput,
        superTypeInput,
        setInput,
        colorInput
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { cards } = await response.json();

      const cardData = cards.map((card) => ({
        cardId: card.id,
        name: card.name,
        type: card.type,
        text: card.text,
        image: card.imageUrl,
      }));

      setSearchedCards(cardData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container sx={{ marginTop: "10em" }}>
        <h2 style={{ color: "#fff" }}>Search for Cards</h2>
        <Typography color={"primary"} style={{ maxWidth: "570px" }}>
          Any and all fields may be left blank.<br></br>
          Results are randomized and only 20 cards are returned at a time, so
          feel free to keep clicking the submit button to get fresh results with
          your query!
        </Typography>
        <br></br>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr" },
            gap: 3,
            marginBottom: "3em",
            justify: "center",
            alignItems: "center",
          }}
        >
          {/* search by card name */}
          <SearchBox
            name="nameInput"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            // trims extra spaces after the user has finished typing
            onBlur={() => setNameInput(nameInput.trim())}
            label="Search by Card Name"
            id="cardName"
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          {/* search by card type */}
          <AutoSearch
            name="typeInput"
            disablePortal
            value={typeInput}
            getOptionLabel={(option) => (option.title ? option.title : "")}
            onChange={(e, values) => setTypeInput(values)}
            id="cardType"
            options={options}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
            renderInput={(params) => (
              <TextField {...params} label="Card Type" />
            )}
          />

          {/* search by supertype */}
          <SearchBox
            name="superTypeInput"
            value={superTypeInput}
            onChange={(e) => setSuperTypeInput(e.target.value)}
            //supertype doesn't allow for spaces in the fetch like name param does: this trims field onBlur
            onBlur={() => setSuperTypeInput(superTypeInput.trim())}
            label="Search by Supertype (Basic, Legendary, Snow, etc))"
            id="cardName"
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          {/* search by subtype */}
          <SearchBox
            name="subtypeInput"
            value={subtypeInput}
            onChange={(e) => setSubtypeInput(e.target.value)}
            onBlur={() => setSubtypeInput(subtypeInput.trim())}
            label="Search by Subtype (dragon, cat, zombie, squirrel, etc.)"
            id="cardName"
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          {/* search by setType */}
          <SearchBox
            name="setInput"
            value={setInput}
            onChange={(e) => setSetInput(e.target.value)}
            onBlur={() => setSetInput(setInput.trim())}
            label="Search by Set Name"
            id="cardName"
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          {/* checkboxes for colors to search */}
          <Box
            name="colorInput"
            value={colorInput}
            onChange={(e) => setColorInput(colorInput + e.target.value + ",")}
            sx={{
              padding: "2em",
              paddingTop: "5px",
              borderRadius: "8px",
              borderColor: "teal",
              borderWidth: "2px",
              borderStyle: "solid",
              textAlign: "left",
              color: "#fff",
            }}
          >
            <h3>Select Card Colors:</h3>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="White"
              value="w"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Blue"
              value="u"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Green"
              value="g"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Red"
              value="r"
              sx={{ color: "#fff" }}
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Black"
              value="b"
              sx={{ color: "#fff" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            style={{ maxWidth: "100px" }}
          >
            Submit
          </Button>
        </Box>

        {/* results of search (map all cards returned) */}

        <Grid container key="searchGrid">
          {searchedCards.map((card) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ maxHeight: "580px" }}
                key={card.cardId}
              >
                <SingleCard card={card} wishList={userData.wishList} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Search;
