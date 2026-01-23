//#region 
import mongoose from "mongoose"
//#endregion

//#region contract schema
const rentContractSchema = new mongoose.Schema({
  title: { type: String, required: true } ,
  rentBeginn: { type: Date, required: true,
    validate: {
    validator: function(value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value >= today;
    },
    message: "Start date cannot be in the past"
  }},
  rentEnd: { type: Date, required: true },
  contractState: { type: String, enum: ['active','scheduled','expired','cancelled'], default: 'scheduled'},
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
    ref: 'User'
  },
  orderStatus: {type: String, enum: ['pending', 'cancelled', 'approved'], default: 'pending'}
},{timestamps: true})
//#endregion

rentContractSchema.pre('save', function() {
  if (this.rentEnd < this.rentBeginn) {
    return next(new Error('End date must be after start date'));
  }
});

const rentContract = mongoose.model('rentContract', rentContractSchema )

export default rentContract