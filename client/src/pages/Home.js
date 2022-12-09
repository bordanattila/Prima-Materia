import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Container } from "@mui/system";

const Home = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              color: "#fff",
              alignItems: "center",
            }}
          >
            <Typography>
              Prima Materia in alchemy and philosophy, prima materia, materia
              prima or first matter {"("}for a philosophical exposition refer
              to: Prime Matter
              {")"}, is the ubiquitous starting material required for the
              alchemical magnum opus and the creation of the philosopher's
              stone. It is the primitive formless base of all matter similar to
              chaos, the quintessence or aether.
              <br />- Wikipedia
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
