//#region 
import mongoose from "mongoose";
import validator from "validator";
import argon2 from "argon2";
//#endregion

//#region 
const clientSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:3, maxlength: 30, trim: true},
  surname: {type: String, required: true, minlength:3, maxlength: 30, trim: true},
  email: {type: String, required: true, minLength:3, maxLength: 30, unique: true, lowercase: true, trim: true, 
    validate:[validator.isEmail, "Invalid email address"]
  },
  password: {type: String, required: true, minlength:8, trim: true, select: false,
    validate: {
    validator: (val) => {
      const regexPass =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,}$/;
      return regexPass.test(val);
    },
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
  }
  },
  phone: {type: String, required: true, minLength:7, maxLength: 15},
  role: {type: String, enum: ["client","admin","agent"], default: "client"},
  lastlogin: {type: Date},
  isActiveAcc: {type: Boolean, default: true}
},{timestamps: true})

//#endregion

clientSchema.pre('save', async function () {
  if(!this.isModified('password')) return 
  this.password = await argon2.hash(this.password)
})

//#region transform response
clientSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});
//#endregion

// hash password on update
clientSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  if (update?.password) {
    update.password = await argon2.hash(update.password);
  }
});

clientSchema.pre('findByIdAndUpdate', async function () {
  const update = this.getUpdate();
  if (update?.password) {
    update.password = await argon2.hash(update.password);
  }
});

//#region 
clientSchema.statics.findByCredentials = async function(enteredEmail, enteredPassword){
  const client = await this.findOne({email: enteredEmail}).select('+password')
  if(!client || !client.isActiveAcc || !(await argon2.verify(client.password, enteredPassword)))
    throw new Error('Invalid email, password or inactive account')
  return client
}
//#endregion

const Client = mongoose.model('Client', clientSchema)

export default Client