import { useState } from "react";

const MainCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative h-full">
      <div className="absolute w-full top-1/2 transform -translate-y-1/2">
        <div
          onClick={goToPrevious}
          className="absolute left-4 text-4xl text-white cursor-pointer"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0001 2.66675C8.65341 2.66675 2.66675 8.65341 2.66675 16.0001C2.66675 23.3467 8.65341 29.3334 16.0001 29.3334C23.3467 29.3334 29.3334 23.3467 29.3334 16.0001C29.3334 8.65341 23.3467 2.66675 16.0001 2.66675ZM18.3867 20.0001C18.7734 20.3867 18.7734 21.0267 18.3867 21.4134C18.1867 21.6134 17.9334 21.7067 17.6801 21.7067C17.4267 21.7067 17.1734 21.6134 16.9734 21.4134L12.2667 16.7067C11.8801 16.3201 11.8801 15.6801 12.2667 15.2934L16.9734 10.5867C17.3601 10.2001 18.0001 10.2001 18.3867 10.5867C18.7734 10.9734 18.7734 11.6134 18.3867 12.0001L14.3867 16.0001L18.3867 20.0001Z"
              fill="#292D32"
            />
          </svg>
        </div>
        <div
          onClick={goToNext}
          className="absolute right-0 text-4xl text-white cursor-pointer"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.0001 2.66675C8.65341 2.66675 2.66675 8.65341 2.66675 16.0001C2.66675 23.3467 8.65341 29.3334 16.0001 29.3334C23.3467 29.3334 29.3334 23.3467 29.3334 16.0001C29.3334 8.65341 23.3467 2.66675 16.0001 2.66675ZM19.7201 16.7067L15.0134 21.4134C14.8134 21.6134 14.5601 21.7067 14.3067 21.7067C14.0534 21.7067 13.8001 21.6134 13.6001 21.4134C13.2134 21.0267 13.2134 20.3867 13.6001 20.0001L17.6001 16.0001L13.6001 12.0001C13.2134 11.6134 13.2134 10.9734 13.6001 10.5867C13.9867 10.2001 14.6267 10.2001 15.0134 10.5867L19.7201 15.2934C20.1201 15.6801 20.1201 16.3201 19.7201 16.7067Z"
              fill="#292D32"
            />
          </svg>
        </div>
      </div>
      <div
        className="w-full relative h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>
      <div className="absolute z-1 hidden inset-0 bg-neutral/25"></div>
      <div className="flex justify-center">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`mx-3 cursor-pointer text-2xl carousel-indicator-item ${
              currentIndex === slideIndex ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;
