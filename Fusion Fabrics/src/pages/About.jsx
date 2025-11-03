import React from 'react';
import fusionImage from "../assets/fusion.png";
import creatersImage from '../assets/creaters.png';

const About = () => {
  return (
    <div className="container my-5">
      {/* Section: Our Story */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}>
          The Art of Beauty
        </h2>
        <p className="text-muted w-75 mx-auto" style={{ fontSize: '1.1rem' }}>
          At Fusion Fabrics, we believe that fashion is the art of expressing who you are.
          Our journey began with a simple idea to create clothing that blends modern elegance with timeless tradition. Each piece we design reflects a perfect harmony of style, comfort, and craftsmanship.

          From everyday essentials to statement outfits, every fabric we choose and every stitch we craft tells a story of quality and passion.
          At Fusion Fabrics, we don’t just make Clothes we create experiences that celebrate individuality, confidence, and grace.
          Step into a world where fashion meets perfection welcome to Fusion Fabrics. ✨
        </p>
      </div>

      {/* Image + Stats */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={fusionImage}
            alt="Fusion Fabrics"
            className="img-fluid rounded shadow"
          />

        </div>
        <div className="col-md-6 text-center">
          <div className="row">
            <div className="col-6 mb-4">
              <h4 className="fw-bold">500K+</h4>
              <p className="text-muted">Happy Customers</p>
            </div>
            <div className="col-6 mb-4">
              <h4 className="fw-bold">1000+</h4>
              <p className="text-muted">Exclusive Clothes</p>
            </div>
            <div className="col-6 mb-4">
              <h4 className="fw-bold">120</h4>
              <p className="text-muted">Global Stores</p>
            </div>
            <div className="col-6 mb-4">
              <h4 className="fw-bold">75+</h4>
              <p className="text-muted">Awards Won</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Our Team */}
      <div className="text-center mb-5">
        <h3 className="fw-bold" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}>
          Meet Our Experts
        </h3>
        <p className="text-muted w-75 mx-auto" style={{ fontSize: '1.1rem' }}>
          Our team of beauty experts, makeup artists, and visionaries work tirelessly 
          to bring the Dior magic into every collection. Their dedication, creativity, and passion 
          are the heart of everything we create.
        </p>
      </div>

      {/* Team Members */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <img 
            src={creatersImage} 
            alt="Creative Director" 
            className="img-fluid rounded-circle shadow mb-3" 
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
          <h5 className="fw-bold">Sophie Laurent</h5>
          <p className="text-muted">Creative Director</p>
        </div>
        <div className="col-md-4 mb-4">
             <img 
            src={creatersImage} 
            alt="Creative Director" 
            className="img-fluid rounded-circle shadow mb-3" 
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
          <h5 className="fw-bold">Isabelle Moreau</h5>
          <p className="text-muted">Lead Makeup Artist</p>
        </div>
        <div className="col-md-4 mb-4">
             <img 
            src={creatersImage} 
            alt="Creative Director" 
            className="img-fluid rounded-circle shadow mb-3" 
            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
          />
          <h5 className="fw-bold">Alexandre Dubois</h5>
          <p className="text-muted">Marketing Head</p>
        </div>
      </div>
    </div>
  );
};

export default About;
