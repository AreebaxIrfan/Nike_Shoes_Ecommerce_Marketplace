import { client } from "@/app/lib/sanity"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (body.action === "submit-review") {
      return handleReviewSubmission(body)
    } else if (body.action === "check-purchase") {
      return handleCheckPurchase(body)
    } else {
      return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

async function handleReviewSubmission(body: any) {
  const { productName, rating, comment, phone, email } = body

  if (!productName || !rating || !comment || !phone || !email) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
  }

  try {
    // Check if the user has purchased the product
    const hasPurchased = await checkUserPurchase(productName, email)
    if (!hasPurchased) {
      return NextResponse.json(
        { success: false, message: "You must purchase the product before reviewing" },
        { status: 403 },
      )
    }

    // Fetch the product by name
    const product = await client.fetch(`*[_type == "product" && productName == $productName][0]._id`, { productName })

    if (!product) {
      console.error(`Product not found: ${productName}`)
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    console.log(`Found product ID: ${product}`)

    const newReview = {
      _type: "review",
      product: {
        _type: "reference",
        _ref: product,
      },
      rating: Number(rating),
      comment,
      phone,
      email,
    }

    console.log("Attempting to create review:", JSON.stringify(newReview, null, 2))

    const result = await client.create(newReview)
    console.log("Review created successfully:", result)
    return NextResponse.json({ success: true, reviewId: result._id }, { status: 200 })
  } catch (error) {
    console.error("Error submitting review:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred while submitting the review",
      },
      { status: 500 },
    )
  }
}

async function handleCheckPurchase(body: any) {
  const { productName, email } = body

  if (!productName || !email) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
  }

  try {
    const hasPurchased = await checkUserPurchase(productName, email)
    return NextResponse.json({ success: true, hasPurchased }, { status: 200 })
  } catch (error) {
    console.error("Error checking purchase:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred while checking the purchase",
      },
      { status: 500 },
    )
  }
}

async function checkUserPurchase(productName: string, email: string): Promise<boolean> {
  // Query Sanity to check if the user has purchased the product
  const query = `*[_type == "order" && customer->email == $email && $productName in items[].product->productName][0]`
  const result = await client.fetch(query, { email, productName })
  return !!result
}

