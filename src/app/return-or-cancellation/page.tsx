const RefundPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-neutral-800 shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4 text-white">Refund Policy</h1>
      
      <p className="text-white mb-4">
        We value your satisfaction. If you are not completely satisfied with your purchase, you may request a refund within <strong>2 days</strong> of your purchase date.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Eligibility for Refund:</h2>
      <ul className="list-disc list-inside text-white space-y-1">
        <li>Refund requests must be made within <strong>2 calendar days</strong> from the date of purchase.</li>
        <li>The item/service must not have been used or consumed in a way that renders it non-returnable.</li>
        <li>Proof of purchase (such as a receipt or order number) is required.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">Non-refundable Items/Services:</h2>
      <ul className="list-disc list-inside text-white space-y-1">
        <li>Customized or personalized products</li>
        <li>Services that have already been rendered in full</li>
        <li>Any downloadable or digital content that has been accessed or downloaded</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-6 mb-2">How to Request a Refund:</h2>
      <p className="text-white">
        To request a refund, please contact us at <a href="mailto:sandeeps21788@gmail.com" className="text-blue-600 underline">sandeeps21788@gmail.com</a> with your order details. If your request meets the eligibility criteria, your refund will be processed to the original payment method within <strong>5–7 business days</strong>.
      </p>
    </div>
  );
};

export default RefundPolicy;
