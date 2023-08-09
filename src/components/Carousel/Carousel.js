import React, { useState, useEffect } from "react";

// CSS
import "./carousel.css";

// Image
import imgCarouselA from "../../assets/Image/CarouselAA.jpg";
import imgCarouselB from "../../assets/Image/CarouselBB.jpg";
import imgCarouselC from "../../assets/Image/CarouselCC.jpg";

export default function Carousel() {
  const images = [
    imgCarouselA,
    imgCarouselB,
    imgCarouselC,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour passer à l'image suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour passer à l'image précédente
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="carousel" style={{ position: "relative", height: "70vh" }}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div className="indicators">
        {images.map((image, index) => (
          <span
            key={index}
            className={
              index === currentIndex ? "indicator active" : "indicator"
            }
            onClick={() => setCurrentIndex(index)}
            style={{ position: "relative", top: -60 }}
          ></span>
        ))}
      </div>
    </div>
  );
}
