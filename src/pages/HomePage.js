import React, { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { HouseCard_HP } from "../components/HouseCard_HP";
import { Slider_ } from "../components/Slider";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export function HomePage() {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate();
  

  const getHouses = async () => {
    try {
        const response = await fetch("http://localhost:3001/houses?review_gte=4");
        const data = await response.json();
        setHouses(data);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };

  useEffect(() => {
    getHouses();
  }, []); 

  return (
    <main className="main">
      <Banner /> 
      <section className="house_container_hp">
        <h2 className="Featured Properties">Featured Properties</h2>
        <Slider_>   
          {houses.map((house) => (
            <div key={house.id} className="slider_card">
              <HouseCard_HP {...house} context="home_card" 
                onCardClick={() => navigate(`/apartment/${house.id}`)}
              />
            </div>
          ))}
        </Slider_>
      </section>
    </main>
  );
}