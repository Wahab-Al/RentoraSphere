//#region 
import mongoose from "mongoose";
//#endregion


//#region Unit Schema
const unitSchema = new mongoose.Schema({
  title:{type: String, required: true, trim: true, maxLength: 50, minLength: 5},
  // isunit: {type: Boolean, default: false},
  // isApartment: {type: Boolean, default: false},
  unitType: {type: String, enum: ['unit', 'apartment', 'villa', 'studio'], required: true},
  price: {type: Number, required: true, min: 0},
  location: {type: String, required: true, trim: true},
  bedrooms: {type: Number, required: true, min: 0},
  bathrooms: {type: Number, required: false, min: 0},
  isAvailable: {type: Boolean, default: true},
  owner: {type: mongoose.Schema.Types.ObjectId,
    ref: 'unitOwner', requierd: true
  }
}, { timestamps: true})
//#endregion

//#region Check Hook if it unit or Apartment
// unitSchema.pre('save', function (){
//   if(this.isunit && this.isApartment)
//     this.isApartment = false
// })
//#endregion

const Unit = mongoose.model('Unit', unitSchema)
export default Unit

