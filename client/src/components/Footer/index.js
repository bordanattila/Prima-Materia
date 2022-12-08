import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Footer() {
  return (
    <Paper
      style={{ background: "black" }}
      sx={{
        marginTop: ".2rem",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      component="footer"
      square
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography
            variant="caption"
            color="inherit"
            sx={{ color: "#fff", letterSpacing: ".3rem", fontSize: ".8rem" }}
          >
            Prima Materia 2022
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}

export default Footer;
