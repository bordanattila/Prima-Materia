import { borderRadius, margin } from "@mui/system";
import React, { useState, useEffect } from "react";
import { searchMagicCards } from "../utils/API";
import { alpha, styled } from "@mui/material/styles";
import {
  Container,
  TextField,
  Box,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Icon,
} from "@mui/material";
import { Form } from "react-router-dom";

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

const cardTypes = [
  { label: "creature" },
  { label: "enchantment" },
  { label: "land" },
  { label: "sorcery" },
  { label: "artifact" },
  { label: "instant" },
  { label: "planeswalker" },
];

export const Search = () => {
  const [searchedCards, setSearchedCards] = useState([]);
  const [nameInput, setNameInput] = useState([]);
  const [typeInput, setTypeInput] = useState([]);
  const [subtypeInput, setSubtypeInput] = useState([]);
  const [colorInput, setColorInput] = useState([]);


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await searchMagicCards(
        nameInput,
        typeInput,
        subtypeInput,
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
      console.log(cardData);
      setSearchedCards(cardData);
      console.log(searchedCards);
      // we may not want to clear the form for the user in this setting -- they may want to run the same search again, as it only returns a small, random sample of the many possible matches.
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Container maxWidth="md" sx={{ margin: "10em" }}>
        <h2 style={{ color: "#fff" }}>Search for Cards</h2>

        {/* <Form onSubmit={handleFormSubmit}> */}
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1fr", md: "1fr" },
            gap: 2,
            marginBottom: "2em"
          }}
        >
          {/* search by card name */}
          <SearchBox
            name="nameInput"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            label="Search by Card Name"
            id="cardName"
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          {/* search by card type */}
          <AutoSearch
            name="typeInput"
            // isOptionEqualToValue={true}
            // value={typeInput}
            disablePortal
            id="typeInput"
            options={cardTypes}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
            renderInput={(params) => (
              <TextField {...params} label="Card Type" />
            )}   
            // onChange={(params) => setTypeInput(params)}
          />

          {/* search by subtype */}
          <SearchBox
            name="nameInput"
            value={subtypeInput}
            onChange={(e) => setSubtypeInput(e.target.value)}
            label="Search by Subtype (dragon, cat, zombie, squirrel, etc.)"
            id="cardName"
            sx={{ input: { color: "#fff" }, label: { color: "#fff" }, }}
          />

          {/* checkboxes for colors to search */}
          <Box
            name="colorInput"
            value={colorInput}
            onChange={(e) => setColorInput(colorInput + e.target.value + ",")}
            sx={{
              backgroundColor: "#212121",
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
            {/* <hr></hr> */}

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
           style={{ maxWidth: "100px"}}
          >
            Submit
          </Button>
        </Box>
          {/* submit button */}
        {/* </Form> */}
        {/* <button style={{ color: '#fff', margin: '20em', padding: '2em', backgroundColor: 'green', borderRadius: '8px' }} onClick={() => searchMagicCards()}>Test API</button> */}

        {/* results of search (map all cards returned) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          {searchedCards.map((card) => {
            return (
              <Card key={card.cardId} 
              sx={{ padding: "1.5em", margin: "5px", backgroundColor: "#424242", color: "#fff"}}>
                <CardMedia
                  component="img"
                  image={card.image}
                  alt={card.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="#eeeeee">
                    {card.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* these buttons need functionality */}
                  
                  <Button size="small" color="secondary">Add to Wishlist</Button>
                  <Button size="small">Add to a Deck:</Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default Search;
