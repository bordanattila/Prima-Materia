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
import AlertDialog from "../AddToDeck";

const cardTheme = createTheme({
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS

          background: "#424242",
          border: "solid 2px teal",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: 12,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
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

const MagicCard = () => {
  const [clicked, setClicked] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                <CardMedia
                  component="img"
                  image="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=136279&type=card"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Card Title
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", height: "75px", overflow: "auto" }}
                  >
                    Description Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </Typography>
                </CardContent>
                <CardActions>
                  <div onClick={() => setClicked(!clicked)}>
                    {clicked ? (
                      <Tooltip title="Add to wishlist">
                        <IconButton>
                          <FavoriteBorderIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Remove from wishlist">
                        <IconButton>
                          <FavoriteIcon />
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AlertDialog />
      </Dialog>
    </>
  );
};

export default MagicCard;
