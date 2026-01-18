//#region 
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Unit from "../models/unit.js";
import User from "../models/user.js";
import { sysManager, units } from "./seed/units.js";
//#endregion

//#region 
dotenv.config()

async function seedUnitDatabase() { 
  try { 
    await mongoose.connect(process.env.MONGO_URI); 
    await Unit.deleteMany();
    await User.deleteOne({ role: 'sysManager' })

    await Unit.insertMany(units); 
    // await User.create(sysManager, {validateBeforeSave: false})
    await User.create(sysManager)
    console.log(`✅ ${units.length} units seeded.`); 
  } catch (error) { 
    console.error("❌ Seeding failed:", error.message); 
  } finally { 
    await mongoose.connection.close(); process.exit(0); 
  }}
//#endregion

seedUnitDatabase();