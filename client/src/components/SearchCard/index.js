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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import AddToDeckDialog from "../AddToDeckDialog";
import { useMutation } from '@apollo/client';
import { ADD_CARD_LIST, ADD_CARD_DECK } from "../../utils/mutations";
import Auth from "../../utils/auth";

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
  const [open, setOpen] = React.useState(false);
  const [searchedCard, setSearchedCard] = useState([]);
  const [addCardToWishList, { error }] = useMutation(ADD_CARD_LIST);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  console.log("***CARD***");
  console.log(card);

  const handleSaveCardToList = async (card) => {
    // to change the icon to the filled heart
    setClicked(!clicked);

    try {
      const { data } = await addCardToWishList({
        variables: { ...card }
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
                <CardMedia component="img" image={card.image} alt={card.name} />
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
                      <IconButton onClick={handleClickOpen}>
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
      <Dialog open={open} onClose={handleClose}>
        <AddToDeckDialog />
      </Dialog>
    </>
  );
};

export default SearchCard;
