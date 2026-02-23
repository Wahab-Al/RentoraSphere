//#region 
import { z } from 'zod'
//#endregion


const zodRegister = z.object({
  name: z.string().trim().min(3).max(30),
  surname: z.string().trim().min(3).max(30),
  email: z.string().trim().toLowerCase().email('Invalid email format').min(3).max(30),
  password: z.string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,}$/,
      { message: "Password is too weak" }
    ),
  phone: z.string().min(7).max(15), 
  role: z.enum(["user", "sysManager", "unitOwner"]).default("user"),
  ownerData: z.object({}).passthrough().optional().nullable(),
})


const zodLogin = z.object({
  email: z.string().trim().toLowerCase().email('Invalid email format').min(3).max(30),
  password: z.string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,}$/,
      { message: "Password is too weak" }
    )
})


const zodUpdateUser = zodRegister.partial().omit({
  password: true, role: true
})

export { zodRegister, zodLogin, zodUpdateUser }