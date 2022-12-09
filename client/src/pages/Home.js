import React from "react";
import { Box, Typography } from "@mui/material";

export const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Box>
        <Typography sx={{ color: "#fff" }}>
          Prima Materia in alchemy and philosophy, prima materia, materia prima
          or first matter {"("}for a philosophical exposition refer to: Prime
          Matter
          {")"}, is the ubiquitous starting material required for the alchemical
          magnum opus and the creation of the philosopher's stone. It is the
          primitive formless base of all matter similar to chaos, the
          quintessence or aether.
          {"\n"}
          -Wikipedia
        </Typography>
      </Box>
    </>
  );
};

export default Home;
