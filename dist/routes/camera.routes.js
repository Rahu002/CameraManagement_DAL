"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camera_controller_1 = require("../controllers/camera.controller");
const router = (0, express_1.Router)();
// Get all camera
router.get("/", camera_controller_1.getAllCameras);
// Get all camera by id
router.get("/:id", camera_controller_1.getCameraById);
// Create a new camera
router.post("/add", camera_controller_1.createCamera);
// Update  camera  by ID
router.put("/update/:id", camera_controller_1.updateCameraById);
// Delete  camera  by ID
router.delete("/delete/:id", camera_controller_1.deleteCameraById);
exports.default = router;
//# sourceMappingURL=camera.routes.js.map