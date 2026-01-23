//#region 
import mongoose from "mongoose";
//#endregion


//#region Unit Schema
const unitSchema = new mongoose.Schema({
  title:{type: String, required: true, trim: true, maxLength: 50, minLength: 5},
  unitType: {type: String, enum: ['house', 'apartment', 'villa', 'studio'], 
    requierd: [true, "Please specify the unit type"], lowercase: true, trim: true},
  price: {type: Number, required: true, min: 0},
  location: {type: String, required: true, trim: true},
  bedrooms: {type: Number, required: true, min: 0},
  bathrooms: {type: Number, required: false, min: 0},
  unitStatus: {
  type: String,
  enum: ['available', 'rented', 'maintenance', 'reserved'],
  default: 'available',
  lowercase: true
},
  owner: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
  }
}, { timestamps: true})
//#endregion

const Unit = mongoose.model('Unit', unitSchema)
export default Unit