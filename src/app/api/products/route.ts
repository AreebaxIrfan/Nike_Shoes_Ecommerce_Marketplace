import { client } from "@/app/lib/sanity"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import data from "@/data/products.json"

export function GET() {
  return NextResponse.json({ success: true, data: data })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (body.action === "submit-review") {
      return handleReviewSubmission(body)
    } else if (body.customerData && body.orderData) {
      return handleOrderCreation(body)
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
  //Implementation for handling review submissions
  console.log("Review submission data:", JSON.stringify(body, null, 2))
  return NextResponse.json({ success: true, message: "Review submitted successfully" })
}

async function handleOrderCreation(body: any) {
  const { customerData, orderData } = body
  console.log("Received data:", JSON.stringify({ customerData, orderData }, null, 2))

  if (!customerData || !orderData) {
    return NextResponse.json({ success: false, message: "Missing customer data or order data" }, { status: 400 })
  }

  const orderId = `ORDER-${Date.now()}`

  try {
    // Start a transaction
    const transaction = client.transaction()

    // Create the customer
    const customer = {
      _type: "customer",
      _id: `customer-${uuidv4()}`,
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      pan: customerData.pan,
      address: customerData.address,
      createdAt: new Date().toISOString(),
    }
    console.log("Creating customer:", JSON.stringify(customer, null, 2))
    const createdCustomer = await client.createIfNotExists(customer)

    // Prepare order items
    const itemsWithKeys = await Promise.all(
      orderData.items.map(async (item: any) => {
        if (!item.productId) {
          throw new Error(`Missing productId for item: ${JSON.stringify(item)}`)
        }
        // Use productId directly
        return {
          ...item,
          _key: uuidv4(),
          product: {
            _type: "reference",
            _ref: item.productId,
          },
        }
      }),
    )

    // Create the order
    const order = {
      _type: "order",
      orderId: orderId,
      customer: {
        _type: "reference",
        _ref: createdCustomer._id,
      },
      items: itemsWithKeys,
      status: "processing",
      total: orderData.total,
      createdAt: new Date().toISOString(),
    }
    console.log("Creating order:", JSON.stringify(order, null, 2))
    transaction.create(order)

    // Update inventory
    for (const item of itemsWithKeys) {
      console.log(`Updating inventory for product ${item.product._ref}: -${item.quantity}`)
      transaction.patch(item.product._ref, {
        dec: { inventory: item.quantity },
      })
    }

    // Commit the transaction
    console.log("Committing transaction...")
    const result = await transaction.commit()
    console.log("Transaction result:", JSON.stringify(result, null, 2))

    return NextResponse.json({ success: true, order: result }, { status: 200 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred while creating the order",
      },
      { status: 500 },
    )
  }
}

