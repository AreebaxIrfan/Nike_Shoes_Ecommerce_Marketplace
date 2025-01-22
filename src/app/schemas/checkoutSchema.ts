import { z } from "zod"

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  postalCode: z.string().min(6, "Valid postal code is required"),
  locality: z.string().min(1, "Locality is required"),
  state: z.string().min(1, "State is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  pan: z.string().min(10, "Valid PAN is required"),
})


export type CheckoutFormData = z.infer<typeof checkoutSchema>

