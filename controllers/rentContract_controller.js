import { approveContract, createContractData, getContracts, getContractById, updateContractData, deleteContractData } from "../services/rentContract_service.js"

// get all contracts
const getContractsController = async (request, response) => {
  try {
    const contracts = await getContracts();
    response.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// get a specific contract data
const getContractByIdController = async (request, response) => {
  try {
    const { id } = request.params;
    const contract = await getContractById(id);

    if (typeof contract === 'string') {
      return response.status(404).json({
        success: false,
        error: contract
      });
    }

    response.status(200).json({
      success: true,
      data: contract
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// request to create a new contract
const createContractController = async (request, response)=>{
  try {
    const {unitId} = request.params
    const userId = request.user._id
    const {contractDetails} = request.body || {}

    if (!contractDetails || !contractDetails.rentBeginn || !contractDetails.rentEnd) {
      return response.status(400).json({ 
        success: false, 
        error: "Missing contract details: rentBeginn and rentEnd are required." 
      });
    }
    
    const result = await createContractData(unitId, userId, contractDetails)
    response.status(201).json({success:true, message: result.message, data: result.contract})
  } catch (error) {
    const status = error.message.toLowerCase().includes("not found") || 
                  error.message.toLowerCase().includes("exist") ? 404 : 400;
    response.status(status).json({ success: false, error: error.message });
  }
}

// update contract data
const updateContractDataController = async (request, response) => {
  try {
    const { id } = request.params;
    const updatedContract = await updateContractData(id, request.body);
    response.status(200).json({
      success: true,
      message: "Contract updated successfully",
      data: updatedContract
    });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    response.status(status).json({
      success: false,
      error: error.message
    });
  }
}

// delete specific contract data
const deleteContractDataController = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedContract = await deleteContractData(id);
    response.status(200).json({
      success: true,
      message: "Contract deleted and unit status reverted to available",
      data: deletedContract
    });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    response.status(status).json({
      success: false,
      error: error.message
    });
  }
}

// approve contract request 
const approveContractController = async (request, response)=>{
try {
  const {contractId} = request.params
    const ownerId = request.user._id
    const result = await approveContract(contractId, ownerId)
    response.status(200).json({success: true, message: result.message, data: result.contract})
  } catch (error) {
    const status = error.message.includes("Unauthorized") ? 403 : 400;
    response.status(status).json({ success: false, error: error.message });
  }
}


export {createContractController, approveContractController, getContractsController, getContractByIdController, updateContractDataController, deleteContractDataController}