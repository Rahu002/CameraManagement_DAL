import { Request, Response } from "express";
import Camera from "../models/camera.model";
import CameraNetworks from "../models/cameraNetworks.model";

// Controller function to create a new camera and a new camera network
export async function createCamera(req: Request, res: Response) {
  try {
    
    const cameraData = req.body.cameraData;
    const { serviceID, serviceType } = cameraData;

    // Check if a camera with the same serviceID and serviceType already exists
    const existingCamera = await Camera.findOne({ serviceID });
    if (existingCamera) {
      return res.status(409).json({ message: "Camera  already exists" });
    }
    const response = await Camera.create(cameraData);
    //Check if cameraNetwork already exists
    // const networkServiceID = req.body.networkServiceID;
    // const existingNetwork = await CameraNetworks.findOne({ networkServiceID: networkServiceID });
    // if (existingNetwork.networkServiceID === networkServiceID) {
    //   const filter = { networkServiceID: networkServiceID }
    //   const update = { cameras: [existingNetwork._id] }
    //   const options = { new: true }      
    //   const response = await CameraNetworks.findOneAndUpdate(filter,update,options)
    // }
    
    // Create new camera network with the same ID as the new camera
    const newNetwork = await CameraNetworks.create({
      name: req.body.cameraNetworksData.name,
      description: req.body.cameraNetworksData.description,
      cameras: [response._id],
      isCameraActive: req.body.cameraNetworksData.isCameraActive,
      ipAddress: req.body.cameraNetworksData.ipAddress,
      networkServiceID : req.body.cameraNetworksData.networkServiceID
    });  
    res.status(200).json({
      status: "success",
      message: "Camera Details added successfully",
      data: {
        camera: response,        
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


// Controller function to get all cameras
export async function getAllCameras(req: Request, res: Response) {
  try {
    const filter = req.body.filter || {};
    const fields = req.body.fields || {};
    const response = await Camera.find(filter, fields);
    res.status(200).json({
      status: "success",
      message: "Camera details fetched successfully",
      data: response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to get a single camera by ID
export async function getCameraById(req: Request, res: Response) {
  try {
    const id = (req.params.id)
    const response = await Camera.findById(id);
    if (!response) {
      return res.status(404).json({ message:`Camera Details with Id ${id} not found`});
    }
    res.status(200).json({
      status: "sucess",
      message: "Camera details fetched sucessfully",
      data: response
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a camera by ID
export async function updateCameraById(req: Request, res: Response) {
  try {
    const id = req.params;
    const requestBody = req.body;
    const options = { new: true };
    const response = await Camera.findByIdAndUpdate(req.params.id,requestBody,options)
    if (!response) {
      return res.status(404).json({ message: `Camera with Id ${id} not found` });
    }
    res.status(200).json({
      status: "sucess",
      message: "Camera details updated sucessfully",
      data: response
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller function to delete a camera by ID
export async function deleteCameraById(req: Request, res: Response) {
  try {
    const id = req.params.id
    const response = await Camera.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: `Camera with Id ${id} not found` });
    }

    // Update CameraNetworks table
    const cameraNetworks = await CameraNetworks.find();
    cameraNetworks.forEach(async (network) => {
      if (network.cameras.includes(response._id)) {
        const index = network.cameras.indexOf(response._id);
        network.cameras.splice(index, 1);
        const deletedResponse = await network.save();
      }
    });
    res.status(200).json({
      status: "sucess",
      message: "Camera details deleted sucessfully",      
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
