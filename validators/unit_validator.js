//#region 
import { z } from 'zod'
//#endregion

const zodUnit = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters').max(50, 'Title must be at most 50 characters'),
  unitType: z.enum(['house', 'apartment', 'villa', 'studio'], {
    errorMap: () => ({ message: "Please specify a valid unit type" })
  }),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  location: z.string().trim().min(1, "Location is required"),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0).optional(),
  unitStatus: z.enum(['available', 'rented', 'maintenance', 'reserved'])
    .default('available'),
  owner: z.string().regex(/^[0-9a-fA-C]{24}$/, "Invalid Owner ID format").optional(),
})

const zodUpdateUnit = zodUnit.partial().omit({
  owner: true,
})

export { zodUnit, zodUpdateUnit }