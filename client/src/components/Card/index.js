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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const cardTheme = createTheme({
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: "1rem",
          background: "black",
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
            <Card sx={{ color: "#fff" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=136279&type=card"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Card Title
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    Description
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <div>
                  <Tooltip title="Add to wishlist">
                    <IconButton>
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Remove from wishlist">
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Add to a deck">
                    <IconButton>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </CardActions>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default MagicCard;
