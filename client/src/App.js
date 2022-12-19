import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Decks from "./components/Deck";
import Wishlist from "./pages/Wishlist";
import MysteryCard from "./pages/MysteryCard";
import SingleDeck from "./pages/SingleDeck";

import "./App.css";
import { Container } from "@mui/material";
import CreateDeck from "./pages/CreateDeckName";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

//dark theme by default
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* keeps the default theme dark across site */}
      <ThemeProvider theme={darkTheme}>
        <Router>
          <div>
            <Header />
          </div>
          <div>
            <Container sx={{ mt: "6rem", mb: "6rem" }}>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/decks" element={<Decks />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/mysterycard" element={<MysteryCard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/decks/create" element={<CreateDeck />} />
                <Route path="/decks/:deckId" element={<SingleDeck />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Container>
          </div>
          <div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
