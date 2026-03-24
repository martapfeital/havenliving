import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HouseCard_B } from "../components/HouseCard_B";
import "./Buy.css";

export function BuyPage() {
    const [houses, setHouses] = useState([]);
    const [filters, setFilters] = useState({ type: "All", minBeds: "All", priceRange: [0, 8000] });
    const navigate = useNavigate();
    const [tempFilters, setTempFilters] = useState({ type: "All", minBeds: "All", priceRange: [0, 8000] });
    const toggleFavorite = async (id) => {
        try {
            const updatedHouses = houses.map((house) =>
                house.id === id ? { ...house, isFavorite: !house.isFavorite } : house
            );
            setHouses(updatedHouses);
    
            const house = updatedHouses.find((h) => h.id === id);
            await fetch(`http://localhost:3001/houses/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isFavorite: house.isFavorite }),
            });
        } catch (error) {
            console.error("Failed to update favorite:", error);
        }
    };

    
    const getHouses = async () => {
        try {
            const typeParam = filters.type === "All" ? "" : `type=${filters.type}`;
            const bedsParam = filters.minBeds === "All" ? "" : `beds_gte=${filters.minBeds}`;
            const priceParam = `price_gte=${filters.priceRange[0]}&price_lte=${filters.priceRange[1]}`;
            const params = [typeParam, bedsParam, priceParam].filter(Boolean).join("&");

            const url = `http://localhost:3001/houses${params ? `?${params}` : ""}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch houses");
            const data = await response.json();
            setHouses(data);
        } catch (error) {
            console.error("Error fetching houses:", error);
        }
    };

    const applyFilters = () => {
        setFilters(tempFilters);
    };

    useEffect(() => {
        getHouses();
    }, [filters]);

    return (
        <main className="main">
            <section className="filter_section">
                <h2>Properties</h2>
                <div className="filter_container">
                    <div className="filter_item">
                        <label>Property Type</label>
                        <select value={tempFilters.type} onChange={(e) => setTempFilters({ ...tempFilters, type: e.target.value })}>
                            <option value="All">All</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Studio">Studio</option>
                            <option value="Cottage">Cottage</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Villa">Villa</option>
                        </select>
                    </div>

                    <div className="filter_item">
                        <label>Bedrooms</label>
                        <select value={tempFilters.minBeds} onChange={(e) => setTempFilters({ ...tempFilters, minBeds: e.target.value })}>
                            <option value="All">All</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </div>

                    <div className="filter_item">
                        <label>Price Range</label>
                        <div className="slider_container">
                            <input
                                type="range"
                                min="0"
                                max="8000"
                                step="10"
                                value={tempFilters.priceRange[0]}
                                onChange={(e) =>
                                    setTempFilters({
                                        ...tempFilters,
                                        priceRange: [
                                            Math.min(Number(e.target.value), tempFilters.priceRange[1] - 10),
                                            tempFilters.priceRange[1],
                                        ],
                                    })
                                }
                                className="price_slider"
                            />
                            <input
                                type="range"
                                min="0"
                                max="8000"
                                step="10"
                                value={tempFilters.priceRange[1]}
                                onChange={(e) =>
                                    setTempFilters({
                                        ...tempFilters,
                                        priceRange: [
                                            tempFilters.priceRange[0],
                                            Math.max(Number(e.target.value), tempFilters.priceRange[0] + 10),
                                        ],
                                    })
                                }
                                className="price_slider"
                            />
                            <div className="slider_values">
                                <input
                                    type="text"
                                    value={tempFilters.priceRange[0]}
                                    onChange={(e) => {
                                        const minValue = Math.max(0, Math.min(Number(e.target.value), tempFilters.priceRange[1] - 10));
                                        setTempFilters({ ...tempFilters, priceRange: [minValue, tempFilters.priceRange[1]] });
                                    }}
                                />
                                <input
                                    type="text"
                                    value={tempFilters.priceRange[1]}
                                    onChange={(e) => {
                                        const maxValue = Math.min(8000, Math.max(Number(e.target.value), tempFilters.priceRange[0] + 10));
                                        setTempFilters({ ...tempFilters, priceRange: [tempFilters.priceRange[0], maxValue] });
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <button onClick={applyFilters} className="filter_button">Apply Filters</button>
            </section>

            <section className="house_container_b">
                {houses.length > 0 ? (
                    houses.map((house) => (
                        <HouseCard_B
                            key={house.id}
                            {...house}
                            toggleFavorite={() => toggleFavorite(house.id)}
                            onCardClick={() => navigate(`/apartment/${house.id}`)}
                        />
                ))
            ) : (
                <p>No properties found!</p>
            )}
            </section>
        </main>
    );
}
