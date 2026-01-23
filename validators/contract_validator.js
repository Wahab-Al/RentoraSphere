//#region 
import { z } from 'zod'
//#endregion

const today = new Date()
today.setHours(0, 0, 0, 0)

const dateFields = {
  rentBeginn: z.coerce.date({
    errorMap: () => ({ message: "Please provide a valid start date" })
  }).refine(date => date >= today, {
    message: "Start date cannot be in the past"
  }),
  rentEnd: z.coerce.date({
    errorMap: () => ({ message: "Please provide a valid end date" })
  })
}

const zodCreatContract = z.object(dateFields)
  .refine(data => data.rentEnd > data.rentBeginn, {
    message: "End date must be after the start date",
    path: ["rentEnd"]
  })

const fullFieldsData = {
  title: z.string().trim().min(5).max(100),
  rentBeginn: z.coerce.date(),
  rentEnd: z.coerce.date(),
  monthRentPrice: z.coerce.number().positive(),
  totalContractValue: z.coerce.number().positive()
}


const zodUpdateContract = z.object(fullFieldsData)
.partial()
.strict()
.refine(data => {
  if (data.rentBeginn && data.rentEnd) {
    return data.rentEnd > data.rentBeginn
  }
  return true
}, {
  message: "End date must be after the start date",
  path: ["rentEnd"]
})

export { zodCreatContract, zodUpdateContract }