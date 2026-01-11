
//#region 
import { createHouseData, deleteHouseData, getAllHouses, getHouseById, updateHouseData } from '../services/house_service.js'
//#endregion

//#region 

// get all houses controller
async function displayHouses(request, response) {
  try {
    const houses = await getAllHouses();
    response.status(200).json(houses)
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

// get house by id controller
async function _getHouseById(request, response) {
  try {
    // console.log("Fetching house with ID:", request.params.id);
    const house = await getHouseById(request.params.id)
    response.status(200).json(house)
  } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      response.status(status).json({error: error.message})
  }
}

// update house data controller
async function _updateHouseData(request, response) {
  try {
    const newHouse = await updateHouseData(request.params.id, request.body)
    response.status(201).json(newHouse)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// create house data controller
async function createNewHouseData(request, response) {
  try {
    const newHouseData = await createHouseData(request.body)
    response.status(201).json(newHouseData)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

// delete house data controller
async function _deletHouseData(request, response) {
  try {
    const deletedHouse = await deleteHouseData(request.params.id)
    response.status(200).json(deletedHouse)
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    response.status(status).json({error: error.message})
  }
}

//#endregion

export { displayHouses, _getHouseById, _updateHouseData, createNewHouseData, _deletHouseData }