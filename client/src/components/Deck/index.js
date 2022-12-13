import React, { useState, useEffect } from 'react';
import CurrentDecks from "./CurrentDecks"
import CreateDeck from "../../pages/CreateDecks";
import {
    Container,
} from "@mui/material";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Decks() {
// set currentPage state to CurrentDecks to start with
    // const [currentPage, setCurrentPage] = useState("CurrentDecks");

    //     // render page based on user click
    //     const renderPage = () => {
    //         if (currentPage === "CreateDeck") {
    //             return <CreateDeck />;
    //         }
    //         // return <CurrentDecks />
    //     };

    //     // set current page to the one that is clicked on
    // const handlePageChange = (page) => setCurrentPage(page);

    return (
        <>
    <CurrentDecks />
        </>
    );

}
export default Decks;