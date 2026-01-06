
import House from "../models/house.js"

const getAllHousesController = async()=>{
  return await House.find().sort({Timestamp: -1})
}

async function displayHouses(req, res) {
  try {
    const houses = await getAllHousesController();
    res.status(200).json(houses)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch houses" });
  }
}

export default displayHouses