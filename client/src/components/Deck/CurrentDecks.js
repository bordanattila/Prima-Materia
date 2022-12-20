import React from "react";
import {
  Box,
  ThemeProvider,
  createTheme,
  CardMedia,
  Card,
  Button,
  Typography,
  Tooltip,
  CardContent,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { QUERY_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { REMOVE_DECK } from "../../utils/mutations";
import Auth from "../../utils/auth";

// styling button
const linkStyle = {
  textDecoration: "none",
  color: "black",
  // fontSize: "20px",
};

// create theme for the card
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

function CurrentDecks() {
  const { loading, error, data } = useQuery(QUERY_ME);
  const [removeDeck] = useMutation(REMOVE_DECK, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const userData = data?.me || [];

  if (error)
    return (
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        You need to be logged in
      </h1>
    );

  const handleDelete = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    try {
      const { data } = await removeDeck({
        variables: { _id: _id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        Your Decks
      </h1>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr" },
          gap: 2,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={
            {
              // minWidth: "200px",
              // maxWidth: "200px",
              // minHeight: "50px",
              // maxHeight: "50px",
            }
          }
        >
          <Link to={"/decks/create"} style={linkStyle}>
            Create Deck
          </Link>
        </Button>
      </Box>

      <Box
        component="form"
        noValidate
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr 1fr" },
          gap: 2,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {userData?.decks?.length > 0 ? (
          <section
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: "2em",
              justifyContent: "center",
              gap: 40,
            }}
          >
            {userData?.decks?.map((deck) => {
              return (
                <>
                  <ThemeProvider key={deck._id} theme={cardTheme}>
                    <Card key={deck._id} sx={{ color: "#fff", width: "250px" }}>
                      <CardContent key={deck._id}>
                        <Link className="custom-link" to={`/decks/${deck._id}`}>
                          <CardMedia
                            component="img"
                            image="https://cf.geekdo-images.com/CxJmNl4wR4InjqyNrMdBTw__imagepagezoom/img/KuHBP_jVjw_8gbieS8skQD_-_Ho=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic163749.jpg"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              sx={{
                                fontWeight: "bold",
                                height: "40px",
                                fontSize: "20px",
                              }}
                              component="div"
                            >
                              {deck.title}
                            </Typography>
                          </CardContent>
                        </Link>
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: 160,
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Delete deck">
                            <IconButton onClick={() => handleDelete(deck._id)}>
                              <DeleteIcon
                                className="custom-link"
                                sx={{ variant: "filled" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </ThemeProvider>
                </>
              );
            })}
          </section>
        ) : (
          <h1>No Decks found</h1>
        )}
      </Box>
    </>
  );
}
export default CurrentDecks;
