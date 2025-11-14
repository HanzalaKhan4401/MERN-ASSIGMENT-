import React from "react";

const Banner = () => {
  return (
    <div
      id="mainCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://i.etsystatic.com/11147089/r/il/99d4e2/3608308189/il_1080xN.3608308189_gs9i.jpg"
            className="d-block w-100 img-fluid"
            alt="Slide 1"
            style={{
              height: "400px",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://s.alicdn.com/@sc04/kf/He9e75195a2f4491c97b88b16baff7253L/LMT2141-Guangzhou-Clothes-Factory-Wholesale-Custom-260-Gsm-100-Cotton-Regular-Fit-T-Shirts-for-Men-for-Women.jpg"
            className="d-block w-100 img-fluid"
            alt="Slide 2"
            style={{
              height: "400px",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://t4.ftcdn.net/jpg/10/30/50/29/360_F_1030502985_cW0MyUdKFtsU95TtefMznsAfo041I4LD.jpg"
            className="d-block w-100 img-fluid"
            alt="Slide 3"
            style={{
              height: "400px",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
