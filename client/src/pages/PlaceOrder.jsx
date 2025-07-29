import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useArtworkStore } from "../store/artworkStore";
import { useOrderStore } from "../store/orderStore";
import { toast } from "react-toastify";
import validator from "validator";

const PlaceOrder = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  // State to hold payment method
  const [paymentMethod, setPaymentMethod] = useState("cod");
  // State to hold quantity of artworks
  const [quantity, setQuantity] = useState(1);
  // State to hold shipping address
  const [shippingAddress, setShippingAddress] = useState({ fullName: '', phone: '', address: '', city: '', pinCode: '' });

  // States from artwork store
  const { getArtwork, artwork, error: artworkError } = useArtworkStore();

  // fetch the artwork when component mount or id changes
  useEffect(() => {
    if (id) {
      getArtwork(id);
    }
  }, [id, getArtwork]);

  // Calculate the total price of artwork with the help of price and quantity
  const totalArtworkPrice = useMemo(() => {
    const price = Number(artwork?.price || 0);
    const qty = Number(quantity || 1);
    return price * qty;
  }, [artwork?.price, quantity]);

  // Set the shipping fee
  const shippingFee = useMemo(() => {
    return totalArtworkPrice >= 499 ? 0 : 40;
  }, [totalArtworkPrice]);

  // Calculate the total amount pay 
  const totalAmount = useMemo(() => {
    return totalArtworkPrice + shippingFee;
  }, [totalArtworkPrice, shippingFee]);

  // States from order store
  const { placeOrder, error: orderError } = useOrderStore();

  // Function to handle place order
  const handlePlaceOrder = async () => {

    // Validations
    if (!shippingAddress.fullName) {
      return toast.error("Name is required.");
    }
    if (!shippingAddress.phone) {
      return toast.error("Phone number is required.");
    } else if (!validator.isMobilePhone(shippingAddress.phone)) {
      return toast.error("Enter valid phone number.");
    } else if (shippingAddress.phone.length !== 10) {
      return toast.error("Phone number must be 10 digit long.");
    }
    if (!shippingAddress.address) {
      return toast.error("Address is required.");
    }
    if (!shippingAddress.city) {
      return toast.error("City is required.");
    }
    if (!shippingAddress.pinCode) {
      return toast.error("Pin code is required.");
    } else if (shippingAddress.pinCode.length !== 6) {
      return toast.error("Pincode must be 6 digit long.")
    }

    const success = await placeOrder(
      id,
      quantity,
      shippingAddress,
      paymentMethod,
      {}
    );

    // If order placed successfully then show an success message and navigate to orders page
    if (success) {
      toast.success("Order placed.");
      navigate("/orders")
    }
  };

  // Show an error when component mount or artworkError or orderError changes
  useEffect(() => {
    if (artworkError || orderError) {
      toast.error(artworkError || orderError);
    }
  }, [artworkError, orderError]);

  return (
    <main
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white"
    >
      <Navbar />

      <section className="pt-28 pb-16 px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">

            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                />
                {/* Phone number */}
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                />
                {/* Full address */}
                <textarea
                  placeholder="Full Address"
                  rows="3"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                />
                <div className="flex gap-4">
                  {/* City */}
                  <input
                    type="text"
                    placeholder="City"
                    className="w-1/2 p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="PIN Code"
                    className="w-1/2 p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                    value={shippingAddress.pinCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pinCode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
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
                    onClick={() => setPaymentMethod(method.id)}
                    className={`cursor-pointer border px-4 py-3 rounded-lg ${paymentMethod === method.id
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
                      : "border-gray-300 dark:border-gray-600"
                      }`}
                  >
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        readOnly
                      />
                      <span>{method.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditionally Render Payment Details */}
            {paymentMethod === "card" && (
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

            {paymentMethod === "upi" && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">UPI ID</h3>
                <input
                  type="text"
                  placeholder="you@upi"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-800"
                />
              </div>
            )}

            {paymentMethod === "wallet" && (
              <p className="text-gray-700 dark:text-gray-300">
                Wallet payment options will be shown at checkout.
              </p>
            )}

            {paymentMethod === "cod" && (
              <p className="text-gray-700 dark:text-gray-300">
                Pay cash when the item is delivered to your doorstep.
              </p>
            )}

            <button
              className="mt-6 bg-primary text-white w-full py-2 rounded hover:bg-primary/90 transition"

              onClick={handlePlaceOrder}
            >
              {paymentMethod === "cod" ? "Buy" : "Pay"} ₹ {totalAmount}
            </button>
          </div>

          {/* Order Summary */}
          <div className="sticky top-24 self-start bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex gap-4 items-center">
              <img
                src={artwork?.thumbnail}
                alt={artwork?.title}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex flex-col flex-1">
                <h3 className="font-medium">{artwork?.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">₹{artwork?.price}</p>
                {/* Quantity UI */}
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    disabled={quantity === 1}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-2">{quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <span>Artwork Price</span>
                <span>₹ {totalArtworkPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹ {shippingFee}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PlaceOrder;