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
import DeleteIcon from "@mui/icons-material/Delete";

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

const SingleDeckCard = ({ card }) => {
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
                  <Tooltip title="Remove from deck">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </CardContent>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleDeckCard;
