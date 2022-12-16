import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  ThemeProvider,
  createTheme,
  ModalRoot,
  Tooltip,
  IconButton,
  Dialog,
  Modal,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import AddToDeckDialog from "../AddToDeckDialog";
import { useMutation } from "@apollo/client";
import { ADD_CARD_LIST, ADD_CARD_DECK } from "../../utils/mutations";
import Auth from "../../utils/auth";
import ViewImage from "../ViewImage";

const cardTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#424242",
          border: "solid 2px teal",
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

const SearchCard = ({ card }) => {
  const [clicked, setClicked] = useState();
  const [openDeck, setOpenDeck] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [searchedCard, setSearchedCard] = useState([]);
  const [addCardToWishList, { error }] = useMutation(ADD_CARD_LIST);

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
    // to change the icon to the filled heart
    setClicked(!clicked);

    try {
      const { data } = await addCardToWishList({
        variables: { ...card },
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
        <Grid item>
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
                </CardActions>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
      <Dialog open={openDeck} onClose={handleCloseDecks}>
        <AddToDeckDialog card={card} />
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

export default SearchCard;
