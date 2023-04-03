import { Request, Response } from "express";
import CameraNetworks from "../models/cameraNetworks.model";


// Controller function to create a new camera network
export async function createCameraNetwork(req: Request, res: Response) {
  try {
    //Duplicate Check for create cameraNetwork
    const networkServiceID = req.body.networkServiceID;
    const existingNetwork = await CameraNetworks.findOne({ networkServiceID: networkServiceID });
    if (existingNetwork) {
      return res.status(400).json({ message: `CameraNetwork already exists` });
    }
    const response = await CameraNetworks.create(req.body);
    res.status(200).json({
      status: "success",
      message: "CameraNetwork created successfully",
      data: response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to get all camera networks
export async function getAllCameraNetworks(req: Request, res: Response) {
  try {
    const filter = req.body.filter || {};
    const fields = req.body.fields || {};
    const response = await CameraNetworks.find(filter, fields);
    res.status(200).json({
      status: "success",
      message: "CameraNetwork details fetched successfully",
      data: response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single camera network by ID
export async function getCameraNetworkById(req: Request, res: Response) {
  try {
    const id = req.params.id
    const response = await CameraNetworks.findById(id).populate("cameras", "_id name")
    if (!response) {
      return res.status(404).json({ message: `CameraNetwork with Id ${id} not found` });
    }
    res.status(200).json({
      status: "sucess",
      message: "CameraNetwork details fetched sucessfully",
      data: response
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a camera network by ID
export async function updateCameraNetworkById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const requestBody = req.body;
    const options = { new: true };
    const response = await CameraNetworks.findByIdAndUpdate(id, requestBody , options).populate("cameras", "_id name");
    if (!response) {
      return res.status(404).json({ message: `CameraNetwork with Id ${id} not found` });
    }
    res.status(200).json({
      status: "success",
      message: "CameraNetwork details updated successfully",
      data: response
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller function to delete a camera by ID
export async function deleteCameraNetworkById(req: Request, res: Response) {
  try {
    const id = req.params.id
    const response = await CameraNetworks.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: `Camera with Id ${id} not found` });
    }
    res.status(200).json({
      status: "sucess",
      message: "Camera details deleted sucessfully",
      data: response
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
