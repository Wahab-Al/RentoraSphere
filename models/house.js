//#region 
import mongoose from "mongoose";
import validator, { trim } from "validator";
import argon2 from "argon2";

//#endregion


//#region 
const houseSchema = new mongoose.Schema({
  title:{type: String, required: true, trim: true, maxLength: 50, minLength: 5},
  isHouse: {type: Boolean, default: false},
  isApartment: {type: Boolean, default: false},
  price: {type: Number, required: true, min: 0},
  location: {type: String, required: true, trim: true},
  bedrooms: {type: Number, required: true, min: 0},
  bathrooms: {type: Number, required: false, min: 0},
  isAvailable: {type: Boolean, default: true}
}, { timeStamp: true})
//#endregion

//#region Check Hook if it House or Apartment
houseSchema.pre('save', function (next){
  if(this.isHouse)
    this.isApartment = false
  if(this.isApartment)
    this.isHouse = false
  next();
})
//#endregion

const House = mongoose.model('House', houseSchema)
export default House

