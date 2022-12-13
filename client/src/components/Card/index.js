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
} from "@mui/material";

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
    MuiCardContent: {
      styleOverrides: {
        root: {},
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
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  );
};

export default MagicCard;
