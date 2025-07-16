import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");

  const cart = {
    items: [
      {
        id: 1,
        title: "Mystic Sunrise",
        price: 850,
        thumbnail: "https://via.placeholder.com/100x100.png?text=Art",
      },
    ],
    total: 850,
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

              <div className="space-y-3">
                {[
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "upi", label: "UPI (Google Pay / PhonePe / Paytm)" },
                  { id: "wallet", label: "Wallets" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`cursor-pointer border px-4 py-3 rounded-lg ${
                      selectedMethod === method.id
                        ? "border-primary bg-primary/10 dark:bg-primary/20"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedMethod === method.id}
                        readOnly
                      />
                      <span>{method.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditionally Render Payment Details */}
            {selectedMethod === "card" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Card Details</h3>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-1/2 p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {selectedMethod === "upi" && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">UPI ID</h3>
                <input
                  type="text"
                  placeholder="you@upi"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {selectedMethod === "wallet" && (
              <p className="text-gray-700 dark:text-gray-300">
                Wallet payment options will be shown at checkout.
              </p>
            )}

            {selectedMethod === "cod" && (
              <p className="text-gray-700 dark:text-gray-300">
                Pay cash when the item is delivered to your doorstep.
              </p>
            )}

            <button className="mt-6 bg-primary text-white w-full py-2 rounded hover:bg-primary/90 transition">
              Pay ₹{cart.total}
            </button>
          </div>

          {/* Order Summary */}
          <div className="sticky top-24 self-start bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cart.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>₹{cart.total}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Payment;
