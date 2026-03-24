import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BuyPage } from "./pages/Buy"; 
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { ApartmentPage } from "./pages/ApartmentPage";
import { FavouritesPage } from "./pages/Favourites";
import { SellPage } from "./pages/Sell";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/buy" element={<BuyPage />} /> 
                    <Route path="/favourite" element={<FavouritesPage />} /> 
                    <Route path="/sell" element={<SellPage />} /> 
                    <Route path="/apartment/:id" element={<ApartmentPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App