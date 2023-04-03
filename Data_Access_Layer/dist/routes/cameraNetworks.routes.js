"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cameraNetwork_controller_1 = require("../controllers/cameraNetwork.controller");
const router = express_1.default.Router();
// Create a new camera network
router.post('/add', cameraNetwork_controller_1.createCameraNetwork);
// Get all camera networks
router.get('/', cameraNetwork_controller_1.getAllCameraNetworks);
// Get a camera network by ID
router.get('/:id', cameraNetwork_controller_1.getCameraNetworkById);
// Update a camera network by ID
router.put('/update/:id', cameraNetwork_controller_1.updateCameraNetworkById);
// Delete a camera network by ID
router.delete('/delete/:id', cameraNetwork_controller_1.deleteCameraNetworkById);
exports.default = router;
//# sourceMappingURL=cameraNetworks.routes.js.map