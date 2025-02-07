'use client'
import type React from "react"
import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

interface FAQAndReviewsProps {
  productName: string
}

interface Review {
  _id: string
  rating: number
  comment: string
  phone?: string
  email?: string
}

const FAQAndReviews: React.FC<FAQAndReviewsProps> = ({ productName }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [hasPurchased, setHasPurchased] = useState<boolean | null>(null)

  const faqs = [
    {
      question: "Is this shoe comfortable?",
      answer:
        "Yes, our shoes are designed with comfort in mind. We use high-quality materials and ergonomic designs to ensure maximum comfort for our customers.",
    },
    {
      question: "Is this shoe soft?",
      answer:
        "Our shoes are made with high-quality, soft materials for maximum comfort. The upper is typically made of premium leather or breathable mesh, while the insole is cushioned for a plush feel.",
    },
    {
      question: "How do I care for these shoes?",
      answer:
        "To care for your shoes, we recommend cleaning them regularly with a soft brush or cloth. For leather shoes, use a leather cleaner and conditioner. Always allow your shoes to air dry at room temperature and avoid direct heat sources.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unworn shoes in their original condition and packaging. If you're not satisfied with your purchase, you can return it for a full refund or exchange.",
    },
  ]

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "review" && product->productName == $productName] | order(rating desc) {
          _id,
          rating,
          comment,
          phone,
          email
        }`
        const fetchedReviews = await client.fetch(query, { productName })
        setReviews(fetchedReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        setError("Failed to load reviews. Please try again later.")
      }
    }

    fetchReviews()
  }, [productName])

  const checkPurchase = async () => {
    if (!email) {
      setError("Please enter your email to check if you can leave a review.")
      return false
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "check-purchase",
          productName,
          email,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setHasPurchased(data.hasPurchased)
      return data.hasPurchased
    } catch (error) {
      console.error("Error checking purchase:", error)
      setError("Failed to verify purchase. Please try again later.")
      return false
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const canReview = await checkPurchase()
    if (!canReview) {
      setError("You must purchase this product before leaving a review.")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submit-review",
          productName,
          rating,
          comment: review,
          phone,
          email,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        alert("Thank you for your feedback!")
        setRating(0)
        setReview("")
        setPhone("")
        setEmail("")

        // Refresh reviews
        const query = `*[_type == "review" && product->productName == $productName] | order(rating desc) {
          _id,
          rating,
          comment,
          phone,
          email
        }`
        const fetchedReviews = await client.fetch(query, { productName })
        setReviews(fetchedReviews)
      } else {
        throw new Error(data.message || "Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      setError(error instanceof Error ? error.message : "Failed to submit review. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <span>{faq.question}</span>
                {expandedFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
                )}
              </button>
              {expandedFAQ === index && (
                <p className="mt-2 text-gray-600 text-sm animate-fadeIn">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Customer Reviews</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-4 animate-fadeIn">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                </div>
                <p className="mb-2 text-gray-700">{review.comment}</p>
                <div className="text-sm text-gray-500">
                  {review.phone && <p>Phone: {review.phone}</p>}
                  {review.email && <p>Email: {review.email}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        )}
      </div>

      {/* Submit Review Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Submit a Review</h2>
        {hasPurchased === false && (
          <p className="text-red-500 mb-4">You must purchase this product before leaving a review.</p>
        )}
        <form onSubmit={handleSubmitReview} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          {hasPurchased !== false && (
            <>
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Rating:</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none hover:scale-110 transition-transform duration-200"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="review" className="block mb-2 font-semibold text-gray-700">
                  Review:
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || hasPurchased === false}
          >
            {isSubmitting ? "Submitting..." : hasPurchased === null ? "Check Eligibility" : "Submit Review"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default FAQAndReviews