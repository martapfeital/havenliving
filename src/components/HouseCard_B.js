import React from "react";
import "./styles.css";


export function HouseCard_B({ onCardClick, toggleFavorite, isFavorite, id, title, price, address, beds, baths }) {
    return (
        <div className="buy_card_b" onClick={onCardClick}>
            <div
                className="house_img"
                style={{ backgroundImage: `url(../imagens/${id}.jpg)` }}
            >
                <button
                    className={`favorite_button ${isFavorite ? "favorite" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        toggleFavorite(); 
                    }}
                    style={{
                        backgroundColor: isFavorite ? "white" : "white",
                        color: isFavorite ? "red" : "black",
                    }}
                >
                    ❤
                </button>
            </div>
            <div className="house_content">
                <div className="house_title">
                    <h3>{title}</h3>
                    <h4>{price}€</h4>
                </div>
                <div className="house_location">
                    <img src="/icons/location.png" alt="Location" className="icon" />
                    <p>{address}</p>
                </div>
                <div className="house_description">
                    <div className="item">
                        <img src="/icons/bed.png" alt="beds" className="icon" />
                        <span className="item_text">{beds}</span>
                    </div>
                    <div className="item">
                        <img src="/icons/bath.png" alt="baths" className="icon" />
                        <span className="item_text">{baths}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


