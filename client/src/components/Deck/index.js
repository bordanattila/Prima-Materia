import React, { useState, useEffect } from 'react';
import CurrentDecks from "./CurrentDecks"
import CreateDeck from "../../pages/CreateDeckName";
import {
    Container,
} from "@mui/material";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Decks() {
    return (
        <>
    <CurrentDecks />
        </>
    );

}
export default Decks;