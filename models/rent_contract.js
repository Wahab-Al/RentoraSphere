//#region 
import mongoose from "mongoose"
//#endregion


const rentContractSchema = new mongoose.Schema({
  title: { type: String, required: true } ,
  rentBeginn: { type: Date, required: true },
  rentEnd: { type: Date, required: true },
  contractState: { type: String, enum: ['active','scheduled','expired','cancelled'], required: true },
  monthRentPrice: { type: Number, required: true },
  totalContractValue: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Unit'
  },
  unitOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UnitOwner'
  },
},{timestamps: true})


const rentContract = mongoose.model('rentContract', rentContractSchema )

export default rentContract