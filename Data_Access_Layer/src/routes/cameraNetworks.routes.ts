import express from 'express';
import {
  createCameraNetwork,
  getAllCameraNetworks,
  getCameraNetworkById,
  updateCameraNetworkById,
  deleteCameraNetworkById ,
} from '../controllers/cameraNetwork.controller';

const router = express.Router();

// Create a new camera network
router.post('/add', createCameraNetwork);

// Get all camera networks
router.get('/', getAllCameraNetworks);

// Get a camera network by ID
router.get('/:id', getCameraNetworkById);

// Update a camera network by ID
router.put('/update/:id',updateCameraNetworkById );

// Delete a camera network by ID
router.delete('/delete/:id', deleteCameraNetworkById);

export default router;
