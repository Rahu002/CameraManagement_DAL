import { Router } from "express";
import {
    getAllCameras,
    getCameraById,
    createCamera,
    updateCameraById,
    deleteCameraById,
} from "../controllers/camera.controller";

const router = Router();

// Get all camera
router.get("/",getAllCameras);

// Get all camera by id
router.get("/:id", getCameraById);

// Create a new camera
router.post("/add",createCamera);

// Update  camera  by ID
router.put("/update/:id", updateCameraById);

// Delete  camera  by ID
router.delete("/delete/:id", deleteCameraById);

export default router;
