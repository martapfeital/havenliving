import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ApartmentPage.css";

export function ApartmentPage() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [house, setHouse] = useState(null); 
    const [agent, setAgent] = useState(null); 
    const [error, setError] = useState(null); 

    const toggleFavorite = async () => {
        try {
            const updatedHouse = { ...house, isFavorite: !house.isFavorite };
            setHouse(updatedHouse); 

            await fetch(`http://localhost:3001/houses/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isFavorite: updatedHouse.isFavorite }),
            });
        } catch (error) {
            console.error("Failed to update favorite:", error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchDetails = async () => {
            try {
                const houseResponse = await fetch(`http://localhost:3001/houses/${id}`);
                if (!houseResponse.ok) {
                    throw new Error("Erro ao carregar os dados da casa.");
                }
                const houseData = await houseResponse.json();
                setHouse(houseData);

                const agentId = parseInt(id) % 2 === 0 ? 1 : 0;
                const agentResponse = await fetch(`http://localhost:3001/agents/${agentId}`);
                if (!agentResponse.ok) {
                    throw new Error("Erro ao carregar os dados do agente.");
                }
                const agentData = await agentResponse.json();
                setAgent(agentData);
            } catch (err) {
                console.error("Erro ao buscar os dados:", err);
                setError("Erro ao carregar os dados.");
            }
        };

        fetchDetails();
    }, [id]);

    if (error) {
        return (
            <main className="main">
                <div id="house-details">
                    <button id="back-btn" onClick={() => navigate(-1)}>
                        &larr; Back
                    </button>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    if (!house || !agent) {
        return (
            <main className="main">
                <div id="house-details">
                    <button id="back-btn" onClick={() => navigate(-1)}>
                        &larr; Back
                    </button>
                    <p>Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="main">
            <div id="house-details">
                <button id="back-btn" onClick={() => navigate(-1)}>
                    &larr; Back
                </button>

                <div className="layout">
                    <div className="image-container">
                        <div
                            className="house_img"
                            style={{
                                backgroundImage: `url(http://localhost:3001/imagens/${house.image})`,
                            }}
                        ></div>
                    </div>

                    <div className="info-container">
                        <div className="container">
                            <h1>{house.title}</h1>
                            <h2>€{house.price}</h2>
                            <button
                                className="favourite-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    toggleFavorite(); 
                                }}
                                style={{
                                    backgroundColor: "white",
                                    color: house.isFavorite ? "red" : "black",
                                }}
                            >
                                ❤
                            </button>
                        </div>

                        <div className="house_description">
                            <div className="item">
                                <img src="/icons/bed_.png" alt="beds" className="icon" />
                                <span className="item_text">{house.beds}</span>
                            </div>
                            <div className="item">
                                <img src="/icons/bath_.png" alt="baths" className="icon" />
                                <span className="item_text">{house.baths}</span>
                            </div>
                        </div>

                        <div className="agent-container">
                            <div className="agent-photo">
                                <img
                                    src={`/imagens/agent${agent.id}.jpg`}
                                    className="agent-photo-img"
                                />
                            </div>
                            <div className="agent-info">
                                <p className="agent-title">Agent</p>
                                <p className="agent-name">{agent.name}</p>
                                <div className="agent-contact-container">
                                    <img src="/icons/phone_.png" alt="Phone" className="agent-contact-icon" />
                                    <p className="agent-contact">{agent.contact}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="description">
                    <h3>Description</h3>
                    <p>{house.description}</p>
                </div>

                <div className="amenities">
                    <h3>Amenities</h3>
                    <ul id="amenities-list">
                        {house.amenities.map((amenity, index) => (
                            <li key={index}>
                                <img
                                    src={`/icons/${amenity.toLowerCase().replace(" ", "-")}.png`}
                                    alt={amenity}
                                />
                                <span>{amenity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
