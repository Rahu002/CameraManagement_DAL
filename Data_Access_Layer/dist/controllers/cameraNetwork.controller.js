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
exports.deleteCameraNetworkById = exports.updateCameraNetworkById = exports.getCameraNetworkById = exports.getAllCameraNetworks = exports.createCameraNetwork = void 0;
const cameraNetworks_model_1 = __importDefault(require("../models/cameraNetworks.model"));
// Controller function to create a new camera network
function createCameraNetwork(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Duplicate Check for create cameraNetwork
            const networkServiceID = req.body.networkServiceID;
            const existingNetwork = yield cameraNetworks_model_1.default.findOne({ networkServiceID: networkServiceID });
            if (existingNetwork) {
                return res.status(400).json({ message: `CameraNetwork already exists` });
            }
            const response = yield cameraNetworks_model_1.default.create(req.body);
            res.status(200).json({
                status: "success",
                message: "CameraNetwork created successfully",
                data: response
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.createCameraNetwork = createCameraNetwork;
;
// Controller function to get all camera networks
function getAllCameraNetworks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = req.body.filter || {};
            const fields = req.body.fields || {};
            const response = yield cameraNetworks_model_1.default.find(filter, fields);
            res.status(200).json({
                status: "success",
                message: "CameraNetwork details fetched successfully",
                data: response
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getAllCameraNetworks = getAllCameraNetworks;
;
// Controller function to get a single camera network by ID
function getCameraNetworkById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const response = yield cameraNetworks_model_1.default.findById(id).populate("cameras", "_id name");
            if (!response) {
                return res.status(404).json({ message: `CameraNetwork with Id ${id} not found` });
            }
            res.status(200).json({
                status: "sucess",
                message: "CameraNetwork details fetched sucessfully",
                data: response
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.getCameraNetworkById = getCameraNetworkById;
;
// Controller function to update a camera network by ID
function updateCameraNetworkById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const requestBody = req.body;
            const options = { new: true };
            const response = yield cameraNetworks_model_1.default.findByIdAndUpdate(id, requestBody, options).populate("cameras", "_id name");
            if (!response) {
                return res.status(404).json({ message: `CameraNetwork with Id ${id} not found` });
            }
            res.status(200).json({
                status: "success",
                message: "CameraNetwork details updated successfully",
                data: response
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.updateCameraNetworkById = updateCameraNetworkById;
;
// Controller function to delete a camera by ID
function deleteCameraNetworkById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const response = yield cameraNetworks_model_1.default.findByIdAndDelete(id);
            if (!response) {
                return res.status(404).json({ message: `Camera with Id ${id} not found` });
            }
            res.status(200).json({
                status: "sucess",
                message: "Camera details deleted sucessfully",
                data: response
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.deleteCameraNetworkById = deleteCameraNetworkById;
;
//# sourceMappingURL=cameraNetwork.controller.js.map