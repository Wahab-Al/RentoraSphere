//#region 
import mongoose from "mongoose";
import dotenv from 'dotenv'
import House from "../models/house.js";
import { houses } from "./seed/houses.js";
//#endregion

//#region 
dotenv.config()

async function seedHouseDatabase() { 
  try { 
    await mongoose.connect(process.env.MONGO_URI); 
    await House.deleteMany();

    await House.insertMany(houses); 
    console.log(`✅ ${houses.length} houses seeded.`); 
  } catch (error) { 
    console.error("❌ Seeding failed:", error.message); 
  } finally { 
    await mongoose.connection.close(); process.exit(0); 
  }}
//#endregion

seedHouseDatabase();