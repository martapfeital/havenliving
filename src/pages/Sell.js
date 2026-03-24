import React, { useState } from "react";
import "./Sell.css";

export function SellPage() {
    const [formData, setFormData] = useState({
        type: "",
        title: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        parking: "",
        image: null,
        location: "",
        description: "",
        amenities: [],
    });

    const amenitiesList = [
        "Air Conditioning",
        "Balcony",
        "Coffee Machine",
        "Freezer",
        "Hair Dryer",
        "Microwave",
        "TV",
        "Toaster",
        "WiFi",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const newAmenities = checked
            ? [...formData.amenities, value]
            : formData.amenities.filter((amenity) => amenity !== value);
        setFormData({ ...formData, amenities: newAmenities });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/houses");
            const houses = await response.json();
            const lastId = houses.length > 0 ? Math.max(...houses.map((house) => parseInt(house.id, 10))) : 0;
            const newId = (lastId + 1).toString();

            const imageFileName = `${newId}.jpg`;

            const newHouse = {
                id: newId,
                title: formData.title,
                address: formData.location,
                price: parseInt(formData.price, 10),
                beds: parseInt(formData.bedrooms, 10),
                baths: parseInt(formData.bathrooms, 10),
                parking: formData.parking === "Yes",
                description: formData.description,
                image: imageFileName,
                type: formData.type,
                amenities: formData.amenities,
                review: 0, 
                isFavorite: false,
            };

            if (formData.image) {
                const formDataObj = new FormData();
                formDataObj.append("image", formData.image);
                formDataObj.append("id", newId);

                const uploadResponse = await fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: formDataObj,
                });

                if (!uploadResponse.ok) {
                    alert("Failed to upload image.");
                    return;
                }
            }

            const addResponse = await fetch("http://localhost:3001/houses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newHouse),
            });

            if (addResponse.ok) {
                alert("House added successfully!");
                setFormData({
                    type: "",
                    title: "",
                    price: "",
                    bedrooms: "",
                    bathrooms: "",
                    parking: "",
                    image: null,
                    location: "",
                    description: "",
                    amenities: [],
                });
            } else {
                alert("Failed to add the house. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <main className="main">
            <div className="sell-container">
                <h2 className="sell-title">Add House</h2>
                <form className="sell-form" onSubmit={handleSubmit}>
                    <div className="input-group full-width">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter the title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="type-container">
                        <label>Type</label>
                        <div className="type-option-container">
                            {[
                                { type: "Apartment", icon: "/icons/apartment.png" },
                                { type: "Studio", icon: "/icons/studio.png" },
                                { type: "Cottage", icon: "/icons/cottage.png" },
                                { type: "Villa", icon: "/icons/villa.png" },
                                { type: "Bungalow", icon: "/icons/bungalow.png" },
                            ].map(({ type, icon }) => (
                                <div className="type-option" key={type}>
                                    <input
                                        type="radio"
                                        id={type}
                                        name="type"
                                        value={type}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor={type}>
                                        <img
                                            src={icon}
                                            alt={type}
                                            className="type-icon"
                                        />
                                    </label>
                                    <span>{type}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="inline-group">
                        <div className="input-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Enter the price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="bedrooms">Bedrooms</label>
                            <input
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                placeholder="Enter the number of bedrooms"
                                value={formData.bedrooms}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="bathrooms">WC's</label>
                            <input
                                type="number"
                                id="bathrooms"
                                name="bathrooms"
                                placeholder="Enter the number of bathrooms"
                                value={formData.bathrooms}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group parking-group">
                            <label>Parking</label>
                            <div className="parking-options">
                                <button
                                    type="button"
                                    className={formData.parking === "Yes" ? "active" : ""}
                                    onClick={() => setFormData({ ...formData, parking: "Yes" })}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className={formData.parking === "No" ? "active" : ""}
                                    onClick={() => setFormData({ ...formData, parking: "No" })}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" onChange={handleImageChange} />
                    </div>

                    <div className="input-group full-width">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter the location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group full-width">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter the description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="amenities-section">
                        <label className="amenities-title">Amenities</label>
                        <div className="amenities-container">
                            {amenitiesList.map((amenity) => (
                                <label key={amenity}>
                                    <input
                                        type="checkbox"
                                        value={amenity}
                                        onChange={handleCheckboxChange}
                                    />
                                    {amenity}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Sell
                    </button>
                </form>
            </div>
        </main>
    );
}
