const AboutUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-800 shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4 text-white">About Us</h1>

      <p className="text-white mb-4">
        Welcome to <strong>Vibrant Flights</strong> – your ultimate destination for stylish and affordable clothing. We are passionate about helping you express your individuality through fashion that’s both trendy and comfortable.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Our Mission</h2>
      <p className="text-white mb-4">
        Our mission is to bring the latest fashion trends to your wardrobe without compromising on quality or price. We believe that fashion is for everyone and strive to offer clothing that suits all styles and occasions.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">What We Offer</h2>
      <ul className="list-disc list-inside text-white space-y-1">
        <li>Trendy outfits for men, women, and kids</li>
        <li>Comfortable daily wear and bold party styles</li>
        <li>Seasonal collections and exclusive limited editions</li>
        <li>High-quality fabric and precise tailoring</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Why Choose Us?</h2>
      <ul className="list-disc list-inside text-white space-y-1">
        <li>Handpicked styles curated by fashion enthusiasts</li>
        <li>Affordable pricing without compromising quality</li>
        <li>Fast and reliable shipping</li>
        <li>Dedicated customer support</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Stay Connected</h2>
      <p className="text-white">
        We love hearing from our customers! Follow us on social media or reach out to us via email at <a href="mailto:sandeeps21788@gmail.com" className="text-blue-600 underline">sandeeps21788@gmail.com</a>. Join our fashion community and stay updated on the latest arrivals and exclusive offers.
      </p>
    </div>
  );
};

export default AboutUs;
