//#region 
import mongoose from "mongoose";
import validator from "validator";
import argon2 from "argon2";
import jwt from "jsonwebtoken"
import _config from "../config/env.js";
//#endregion



//#region custom funcs:
const isOwner = function(){
  if(this.role !== 'unitOwner') {return false}
  return true;
}

const isCompanyNameRequired = function(){
  if (!this.ownerData) return false;
  if(this.ownerData.shipType === 'company'){
    return true
  }else return false
}
//#endregion


//#region 
const userSchema = new mongoose.Schema({
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
  role: {type: String, enum: ["user","admin","unitOwner"], default: "user"},
  ownerData:{
    shipType: {type: String, enum: ['private', 'company'], required: isOwner},
    companyName: {type: String, required: isCompanyNameRequired}
  },
  lastlogin: {type: Date},
  isActiveAcc: {type: Boolean, default: true},
  tokens: [{type: String, required: true}]
},{timestamps: true})

//#endregion


userSchema.pre('save', function() {
  if (this.role !== 'unitOwner') {
    this.ownerData = undefined;
  }
});


userSchema.pre('save', async function () {
  if(!this.isModified('password')) return 
  this.password = await argon2.hash(this.password)
})

//#region transform response
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    if(ret.role !== 'unitOwner'){
      delete ret.ownerData
    }
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
});
//#endregion

// hash password on update
userSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();
  if (update?.password) {
    update.password = await argon2.hash(update.password);
  }
});

userSchema.pre('findByIdAndUpdate', async function () {
  const update = this.getUpdate();
  if (update?.password) {
    update.password = await argon2.hash(update.password);
  }
});

//#region 
userSchema.statics.findByCredentials = async function(enteredEmail, enteredPassword){
  const user = await this.findOne({email: enteredEmail}).select('+password')
  if(!user || !user.isActiveAcc || !(await argon2.verify(user.password, enteredPassword)))
    throw new Error('Invalid email, password or inactive account')
  return user
}
//#endregion

//#region generate Token function
userSchema.methods.generateToken = async function (){
  const user = this
  const token = jwt.sign({sub: user._id.toString()}, _config.jwt_secret_key, {expiresIn: '7d'})
  user.tokens = user.tokens.concat(token)
  await user.save()
  return token
}
//#endregion

const User = mongoose.model('User', userSchema)

export default User