"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface ReviewProps {
  productName: string;
  userEmail: string;
}

export default function ReviewComponent({ productName, userEmail }: ReviewProps) {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({
    rating: "",
    comment: "",
  });

  // ✅ Check if the user has purchased this product
  useEffect(() => {
    async function checkPurchaseStatus() {
      try {
        const response = await fetch("/api/check-purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail, productName }),
        });

        const data = await response.json();
        setHasPurchased(data.purchased);
      } catch (error) {
        console.error("Error checking purchase status:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userEmail) checkPurchaseStatus();
  }, [userEmail, productName]);

  // ✅ Handle review submission
  async function submitReview() {
    if (!hasPurchased) {
      toast.error("You must buy this product before submitting a review.");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          rating: review.rating,
          comment: review.comment,
          email: userEmail,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Review submitted successfully!");
        setReview({ rating: "", comment: "" }); // Reset fields
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting the review.");
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Write a Review</h3>

      <input
        type="text"
        placeholder="Rating (1-5)"
        className="w-full p-2 border rounded mt-2"
        value={review.rating}
        onChange={(e) => setReview({ ...review, rating: e.target.value })}
      />

      <textarea
        placeholder="Write your review..."
        className="w-full p-2 border rounded mt-2"
        value={review.comment}
        onChange={(e) => setReview({ ...review, comment: e.target.value })}
      ></textarea>

      <button
        onClick={submitReview}
        disabled={!hasPurchased}
        className={`w-full p-2 mt-3 rounded ${
          hasPurchased ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        {loading ? "Checking..." : "Submit Review"}
      </button>
    </div>
  );
}
