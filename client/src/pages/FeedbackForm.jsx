import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Star } from "lucide-react";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // You can replace this with your actual API call
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    // Optionally reset after submit
    setRating(0);
    setFeedback("");
    alert("Thank you for your feedback!");
  };

  return (
    <>
      <Navbar />

      <main className="pt-24 px-4 md:px-8 lg:px-24 pb-6 bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center">Share Your Thoughts</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Help us improve your Artora experience by leaving your feedback.
          </p>

          {/* Star Rating */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-sm">How was your experience?</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`h-7 w-7 cursor-pointer transition ${
                    star <= rating ? "text-yellow-500 fill-yellow-400" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Feedback Message */}
          <div className="mb-6">
            <label className="block mb-1 font-medium text-sm">Your Feedback</label>
            <textarea
              rows="5"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked, or how we can improve..."
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-white font-medium py-2.5 rounded-md hover:bg-primary/90 transition"
          >
            Submit Feedback
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FeedbackForm;
