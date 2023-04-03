"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCameraById = exports.updateCameraById = exports.getCameraById = exports.getAllCameras = exports.createCamera = void 0;
const camera_model_1 = __importDefault(require("../models/camera.model"));
const cameraNetworks_model_1 = __importDefault(require("../models/cameraNetworks.model"));
// Controller function to create a new camera and a new camera network
function createCamera(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cameraData = req.body.cameraData;
            const { serviceID, serviceType } = cameraData;
            // Check if a camera with the same serviceID and serviceType already exists
            const existingCamera = yield camera_model_1.default.findOne({ serviceID });
            if (existingCamera) {
                return res.status(409).json({ message: "Camera  already exists" });
            }
            const response = yield camera_model_1.default.create(cameraData);
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
            const newNetwork = yield cameraNetworks_model_1.default.create({
                name: req.body.cameraNetworksData.name,
                description: req.body.cameraNetworksData.description,
                cameras: [response._id],
                isCameraActive: req.body.cameraNetworksData.isCameraActive,
                ipAddress: req.body.cameraNetworksData.ipAddress,
                networkServiceID: req.body.cameraNetworksData.networkServiceID
            });
            res.status(200).json({
                status: "success",
                message: "Camera Details added successfully",
                data: {
                    camera: response,
                },
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.createCamera = createCamera;
;
// Controller function to get all cameras
function getAllCameras(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = req.body.filter || {};
            const fields = req.body.fields || {};
            const response = yield camera_model_1.default.find(filter, fields);
            res.status(200).json({
                status: "success",
                message: "Camera details fetched successfully",
                data: response
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getAllCameras = getAllCameras;
;
// Controller function to get a single camera by ID
function getCameraById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = (req.params.id);
            const response = yield camera_model_1.default.findById(id);
            if (!response) {
                return res.status(404).json({ message: `Camera Details with Id ${id} not found` });
            }
            res.status(200).json({
                status: "sucess",
                message: "Camera details fetched sucessfully",
                data: response
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getCameraById = getCameraById;
;
// Controller function to update a camera by ID
function updateCameraById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params;
            const requestBody = req.body;
            const options = { new: true };
            const response = yield camera_model_1.default.findByIdAndUpdate(req.params.id, requestBody, options);
            if (!response) {
                return res.status(404).json({ message: `Camera with Id ${id} not found` });
            }
            res.status(200).json({
                status: "sucess",
                message: "Camera details updated sucessfully",
                data: response
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.updateCameraById = updateCameraById;
;
// Controller function to delete a camera by ID
function deleteCameraById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const response = yield camera_model_1.default.findByIdAndDelete(id);
            if (!response) {
                return res.status(404).json({ message: `Camera with Id ${id} not found` });
            }
            // Update CameraNetworks table
            const cameraNetworks = yield cameraNetworks_model_1.default.find();
            cameraNetworks.forEach((network) => __awaiter(this, void 0, void 0, function* () {
                if (network.cameras.includes(response._id)) {
                    const index = network.cameras.indexOf(response._id);
                    network.cameras.splice(index, 1);
                    const deletedResponse = yield network.save();
                }
            }));
            res.status(200).json({
                status: "sucess",
                message: "Camera details deleted sucessfully",
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.deleteCameraById = deleteCameraById;
;
//# sourceMappingURL=camera.controller.js.map