import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  ThemeProvider,
  createTheme,
  Box,
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
          borderRadius: 14,
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

export default function BasicModal({ card }) {
  const [open, setOpen] = React.useState(false);
  const handleCloseImage = () => {
    setOpen(false);
  };
  return (
    <>
      <ThemeProvider theme={cardTheme}>
        <Card sx={{ width: "458px", height: "639px" }}>
          <CardContent>
            <CardMedia component="img" image={card.image} alt={card.name} />
          </CardContent>
        </Card>
      </ThemeProvider>
    </>
  );
}
