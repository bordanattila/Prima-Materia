import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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
          borderRadius: 20,
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
  },
});

export default function ViewImage({ card }) {
  return (
    <>
      <ThemeProvider theme={cardTheme}>
        <Card sx={{ width: "458px", height: "630px" }}>
          <CardContent>
            <CardMedia component="img" image={card.image} alt={card.name} />
          </CardContent>
        </Card>
      </ThemeProvider>
    </>
  );
}
