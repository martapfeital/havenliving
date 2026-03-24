import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles.css';

export function Slider_(props) {
    const sliderSettings = {
        dots: true, 
        arrows: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false, 
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                },
            }
        ],
    };

    return (
        <Slider {...sliderSettings} className="custom-slider">
            {props.children}
        </Slider>
    );
}
