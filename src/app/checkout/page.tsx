"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaTruck } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { RiDeleteBin6Line } from "react-icons/ri"
import Image from "next/image"
import { useCart } from "./../context/CartContext"
import Summary from "./../cart/OrderSummary"
import { checkoutSchema, type CheckoutFormData } from "./../schemas/checkoutSchema"
import Link from "next/link"
import { useRouter } from "next/navigation"

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const router = useRouter()
  const { clearCart } = useCart()
  const [orderStatus, setOrderStatus] = useState("")
  const [inventoryError, setInventoryError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Assuming free shipping
  const total = subtotal + shipping

  const onSubmit = async (data: CheckoutFormData) => {
    setOrderStatus("Processing...")
    setInventoryError(null)

    const customerData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phoneNumber,
      pan: data.pan,
      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        addressLine3: data.addressLine3,
        postalCode: data.postalCode,
        locality: data.locality,
        state: data.state,
        country: "Pakistan",
      },
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item.id, // Add this line
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        color: item.color || "",
      })),
      total,
    }

    console.log("Sending order data:", { customerData, orderData })

    try {
      const response = await fetch("/api/products", {
        // Changed API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerData, orderData }),
      })

      if (response.ok) {
        const result = await response.json()
        setOrderStatus("Order placed successfully!")
        console.log("Order result:", result.order)

        // Clear the cart
        clearCart()

        // Reset the form
        reset()

        // Refresh the page after a short delay
        setTimeout(() => {
          router.refresh()
        }, 2000)
      } else {
        const errorData = await response.json()
        if (errorData.error === "INSUFFICIENT_STOCK") {
          setInventoryError(`Insufficient stock for ${errorData.productName}. Available: ${errorData.availableStock}`)
        } else {
          setOrderStatus(`Failed to place order: ${errorData.message || "Unknown error"}`)
        }
      }
    } catch (error) {
      console.error("Error occurred while placing order:", error)
      setOrderStatus("An error occurred while placing the order.")
    }
  }
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">How would you like to get your order?</h2>
            <p className="text-gray-600 mb-4">
              Customs regulations for India require a copy of the recipient's KYC. The address on the KYC needs to match
              the shipping address.
              <a href="#" className="text-blue-600 hover:underline ml-1">
                Learn More
              </a>
            </p>
            <div className="border-2 border-black rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-50 transition duration-300 cursor-pointer">
              <FaTruck size={24} className="text-gray-700" />
              <span className="font-medium">Deliver it</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Enter your name and address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <input
                {...register("addressLine1")}
                placeholder="Address Line 1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>}

              <input
                {...register("addressLine2")}
                placeholder="Address Line 2"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />

              <input
                {...register("addressLine3")}
                placeholder="Address Line 3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("postalCode")}
                    placeholder="Postal Code"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
                <div>
                  <input
                    {...register("locality")}
                    placeholder="Locality"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  />
                  {errors.locality && <p className="text-red-500 text-sm mt-1">{errors.locality.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("state")}
                    placeholder="State/Territory"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>
                <input value="Pakistan" readOnly className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100" />
              </div>

              <h3 className="text-xl font-semibold mb-4">What's your contact information?</h3>
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                <p className="text-sm text-gray-500 mt-1">A confirmation email will be sent after checkout</p>
              </div>

              <div>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                <p className="text-sm text-gray-500 mt-1">A carrier might contact you to confirm delivery</p>
              </div>

              <h3 className="text-xl font-semibold mb-4">What's your PAN?</h3>
              <div>
                <input
                  {...register("pan")}
                  placeholder="PAN"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
                {errors.pan && <p className="text-red-500 text-sm mt-1">{errors.pan.message}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  Enter your PAN to enable payment with UPI, Net Banking or local card methods
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition duration-300 text-lg font-semibold"
              >
                Continue to Payment
              </button>
            </form>

            {orderStatus && (
              <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg flex flex-col items-center">
                <p className="font-semibold mb-2">{orderStatus}</p>
                {inventoryError && <p className="text-red-500 text-sm mt-1">{inventoryError}</p>}
                <Link href="/order" className="text-blue-600 hover:underline transition duration-300">
                  Click Here to Track Your Order
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Summary subtotal={subtotal} shipping={shipping} total={total} />
              <p className="text-sm text-gray-600 mt-4">
                (The total reflects the price of your order, including all duties and taxes)
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Your Items</h2>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="ml-6 flex-grow">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="font-medium">₹{item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-gray-600 mb-2">Size: {item.size}</p>
                    <div className="flex justify-between items-center">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, item.size, Number.parseInt(e.target.value))}
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <div className="flex space-x-4">
                        <button className="text-gray-600 hover:text-black transition duration-300">
                          <CiHeart size={24} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-600 hover:text-red-600 transition duration-300"
                        >
                          <RiDeleteBin6Line size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-gray-600 text-center py-8">Your cart is empty. Start shopping!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

