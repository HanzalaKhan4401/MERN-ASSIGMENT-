const Categories = () => {
  const categories = [
    {
      img: "https://i5.walmartimages.com/asr/71359de4-05e1-4844-a828-77dccc4c000e.c49a1ac7983a6ebf62da154b4af736a9.jpeg",
      text: "Drop Shoulder"
    }, 
    {
      img: "https://i.pinimg.com/originals/43/9e/33/439e336980259e871cbcc00d6becea46.jpg",
      text: "Old Money Shirts"
    },
    {
      img: "http://redtrast.ru/pic/kf/HTB1r6igSpXXXXXaXFXXq6xXFXXXP/-.jpg",
      text: "Baggy Cargo"
    },
    {
      img: "https://i.pinimg.com/originals/aa/94/d8/aa94d8590233da4b9e86f584586cac19.jpg",
      text: "Full Slip Shirts"
    },
    {
      img: "https://www.beeswift.com/Images/CLPCSBG@.jpg",
      text: "Sweat Shirt"
    },
    {
      img: "https://img.joomcdn.net/534aa8e83940d4807ef9fa6eb07ca9fbae37398d_original.jpeg",
      text: "Hoodies"
    }
  ];

  return (
    <div className="text-center p-5" id="categories">
      {/* Elegant Subheading */}
      <h5
        className="text-uppercase"
        style={{
          color: '#2C2C2C', // aesthetic gold-beige
          fontWeight: '600',
          letterSpacing: '2px',
          fontSize: '14px'
        }}
      >
        Curated Selections
      </h5>

      {/* Main Stylish Heading */}
      <h2
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2.8rem',
          color: "#4A4A4A",
          fontStyle: 'italic'
        }}
      >
        Discover the Fusion of Style and Detail
      </h2>

      {/* Categories Grid */}
      <div className="d-flex justify-content-center flex-wrap gap-4 mt-4">
        {categories.map((item, index) => (
          <div
            className="border p-3 rounded text-center shadow-sm"
            key={index}
            style={{ width: "120px", backgroundColor: "#f9f9f9" }}
          >
            <img
              src={item.img}
              alt={item.text}
              className="img-fluid mb-2"
              style={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <p
              className="mb-0 fw-semibold"
              style={{ fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
