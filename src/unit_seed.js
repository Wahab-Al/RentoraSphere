//#region 
import mongoose from "mongoose";
import dotenv from 'dotenv'
import Unit from "../models/unit.js";
import { units } from "./seed/units.js";
//#endregion

//#region 
dotenv.config()

async function seedUnitDatabase() { 
  try { 
    await mongoose.connect(process.env.MONGO_URI); 
    await Unit.deleteMany();

    await Unit.insertMany(units); 
    console.log(`✅ ${units.length} units seeded.`); 
  } catch (error) { 
    console.error("❌ Seeding failed:", error.message); 
  } finally { 
    await mongoose.connection.close(); process.exit(0); 
  }}
//#endregion

seedUnitDatabase();