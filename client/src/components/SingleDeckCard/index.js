import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  CardActionArea,
  CardActions,
  ThemeProvider,
  createTheme,
  Tooltip,
  IconButton,
  Dialog
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { REMOVE_CARD_DECK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import ViewImage from "../ViewImage";
import Auth from "../../utils/auth";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import AddToDeckDialog from "../AddToDeckDialog";
import { ADD_CARD_LIST, REMOVE_CARD_LIST } from "../../utils/mutations";

const cardTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#424242",
          boxShadow: "teal 0px 2px 14px 3px",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: ".75rem",
          "&:last-child": {
            paddingBottom: ".75rem",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontSize: "large",
        },
      },
    },
  },
});

const SingleDeckCard = ({ card, deckId, wishList }) => {
    let wishState = false;
    console.log("This is the wishlist: ", wishList);
    //If user is logged in, check their wishlist if the card is in their wishlist and change the heart icon to red
    if (Auth.loggedIn()) {
      const listChecker = wishList.filter(
        (cardObj) => cardObj.cardId === card.cardId
      );
      if (listChecker.length > 0) {
        wishState = true;
      }
    }
  
    const cardData = {
      cardId: card.cardId,
      name: card.name,
      type: card.type,
      text: card.text,
      image: card.image,
    };
  
  const [clicked, setClicked] = useState(wishState);
  const [openDeck, setOpenDeck] = React.useState(false);
  const [addCardToWishList, { error }] = useMutation(ADD_CARD_LIST);
  const [removeCardFromList] = useMutation(REMOVE_CARD_LIST); 
  const [removeCardFromDeck] = useMutation(REMOVE_CARD_DECK);
  const [openImage, setOpenImage] = React.useState(false);

  const handleClickOpenDecks = () => {
    setOpenDeck(true);
  };

  const handleCloseDecks = () => {
    setOpenDeck(false);
  };

  const handleClickOpenImage = () => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleSaveCardToList = async (card) => {
    //If the clicked state is currently set to false, change it to true and add card to user's wishlist
    if (!clicked) {
      //!clicked = false
      try {
        const { data } = await addCardToWishList({
          variables: { ...card },
        });
        setClicked(true);
        return;
      } catch (err) {
        console.error(err);
      }
    }
    //if the current wish state is set to true and the user clicks the button, we want to remove it from our wishlist
    if (clicked) {
      //clicked = true
      try {
        const { data } = await removeCardFromList({
          variables: { idCard: card.cardId }, //Remove the card based on the cardId value
        });
        setClicked(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteCardDeck = async (cardId, deckId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    try {
      const { deck } = await removeCardFromDeck({
        variables: { idCard: cardId, idDeck: deckId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item key={card.cardId}>
          <ThemeProvider theme={cardTheme}>
            <Card sx={{ color: "#fff", width: "250px" }}>
              <CardContent>
                <CardActionArea onClick={handleClickOpenImage}>
                  <Tooltip title="Click to view bigger" followCursor={true}>
                    <CardMedia
                      component="img"
                      image={card.image}
                      alt={card.name}
                    />
                  </Tooltip>
                </CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      height: "40px",
                      size: "2vw",
                    }}
                    component="div"
                  >
                    {card.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", height: "75px", overflow: "auto" }}
                  >
                    {card.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div onClick={() => handleSaveCardToList(card)}>
                    {clicked ? (
                      <Tooltip title="Remove from wishlist">
                        <IconButton>
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to wishlist">
                        <IconButton>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                  <div>
                    <Tooltip title="Add to a deck">
                      <IconButton onClick={handleClickOpenDecks}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                  <Tooltip title="Remove from deck">
                    <IconButton
                      onClick={() => handleDeleteCardDeck(card._id, deckId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  </div>
                </CardActions>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
      <Dialog open={openDeck} onClose={handleCloseDecks}>
        <AddToDeckDialog card={cardData} />
      </Dialog>
      <Modal
        open={openImage}
        onClose={handleCloseImage}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ViewImage card={card} />
      </Modal>
    </>
  );
};

export default SingleDeckCard;
