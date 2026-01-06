//#region 
import mongoose from "mongoose";
import _config from "./env.js";
import { log } from "node:console";
//#endregion

//#region 
export const connectDB = async()=>{
  try {
    await mongoose.connect(_config.mongoUri);
    log('MongoDB Connected 📶🔌')
  } catch (error) {
    console.error(`Database conniction error ❌📡: ${error}`)
    process.exit(1)
  }
}
//#endregion