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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { REMOVE_CARD_DECK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import ViewImage from "../ViewImage";
import Auth from "../../utils/auth";

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

const SingleDeckCard = ({ card, deckId }) => {
  const [removeCardFromDeck] = useMutation(REMOVE_CARD_DECK);
  const [openImage, setOpenImage] = React.useState(false);

  const handleClickOpenImage = () => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
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
                  <Tooltip title="Remove from deck">
                    <IconButton
                      onClick={() => handleDeleteCardDeck(card._id, deckId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
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
