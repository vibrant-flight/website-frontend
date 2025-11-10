import React from 'react';

const ShoppingAndDelivery = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-800 shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4 text-white">Shopping & Delivery Policy</h1>

      <h2 className="text-xl font-semibold text-white mb-2">Shopping</h2>
      <p className="text-white mb-4">
        We strive to provide a seamless shopping experience. All product details, images, and descriptions are provided to help you make informed decisions.
      </p>

      <ul className="list-disc list-inside text-white mb-4 space-y-1">
        <li>Secure and encrypted payment gateway.</li>
        <li>Multiple payment options including credit/debit cards, UPI, and net banking.</li>
        <li>Orders can be tracked from your account dashboard.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mb-2">Delivery</h2>
      <p className="text-white mb-4">
        We aim to deliver your order safely and promptly. Below are the key points regarding our delivery process:
      </p>

      <ul className="list-disc list-inside text-white space-y-1">
        <li>Orders are processed within 1–2 business days.</li>
        <li>Standard delivery takes 3–7 business days depending on your location.</li>
        <li>Delivery charges may apply based on your region and order total.</li>
        <li>We currently deliver all over India.</li>
      </ul>

      <p className="text-white mt-4">
        If you have any issues or need help with your order, feel free to contact us at <a href="mailto:sandeeps21788@gmail.com" className="text-blue-600 underline">sandeeps21788@gmail.com</a>.
      </p>
    </div>
  );
};

export default ShoppingAndDelivery;
