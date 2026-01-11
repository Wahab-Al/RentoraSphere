//#region 
import House from "../models/house.js"
//#endregion

//#region CRUD OPERATIONS:

//get all houses
const getAllHouses = async()=>{
  return await House.find().sort({createdAt: -1})
}

//get house by id
const getHouseById = async(houseId) =>{
  const house = await House.findById(houseId)
  if(!house)  
    throw new Error(`House with id ${houseId} not found`);
  return house
}


// update house data controller
const updateHouseData = async(houseId, house) =>{
  const newHouse = await House.findByIdAndUpdate(houseId, house, {new:true, runValidators: true})
  if(!newHouse)
    throw new Error(`House with id ${houseId} not found`);
  return newHouse
}


// create house data
const createHouseData = async(house)=>{
  const newHouse = await House.create(house)
  return newHouse
}

// delete house data
const deleteHouseData = async(houseId) =>{
  const deletedHouse = await House.findByIdAndDelete(houseId)
  if(!deletedHouse)
    throw new Error(`House with id ${houseId} not found`);
  return deletedHouse
}
//#endregion

export  { getAllHouses, getHouseById, updateHouseData, createHouseData, deleteHouseData }