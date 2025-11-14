import { FaInstagram, FaFacebookF, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row text-center text-md-left">
          {/* First Column */}
          <div className="col-md-3 mb-4">
            <h5 className="font-weight-bold text-uppercase">Exclusive Offers</h5>
            <p>Sign up for our newsletter and enjoy 10% off your first purchase!</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control mb-2"
            />
            <button className="btn btn-danger btn-block">Subscribe</button>
          </div>

          {/* Second Column */}
          <div className="col-md-3 mb-4">
            <h6 className="font-weight-bold text-uppercase">Contact Us</h6>
            <p>1234 Market, Pakistan CA 94111, PAK</p>
            <p>Email: support@ecommerce.com</p>
            <p>Phone: +1 (800) 123-4567</p>
          </div>

          {/* Third Column - Follow Us */}
          <div className="col-md-3 mb-4 text-center">
            <h6 className="font-weight-bold text-uppercase mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center gap-4 mt-2">
              <a href="https://www.instagram.com" className="text-light" style={{ fontSize: "1.7rem" }}>
                <FaInstagram />
              </a>
              <a href="https://www.tiktok.com" className="text-light" style={{ fontSize: "1.7rem" }}>
                <FaTiktok />
              </a>
              <a href="https://www.facebook.com" className="text-light" style={{ fontSize: "1.7rem" }}>
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-light" style={{ fontSize: "1.7rem" }}>
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Fourth Column */}
          <div className="col-md-3 mb-4">
            <h6 className="font-weight-bold text-uppercase">Quick Links</h6>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Return & Exchange Policy</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4 border-top pt-4">
          <p>&copy; 2025 Fusion Fabrics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
