import { Schema, model, Document } from 'mongoose';

interface Camera {
  name: string;
  description: string;
  url: string;
  location: string;
  isActive: boolean;
  serviceID: string;
  serviceType: string;
}

export interface CameraDocument extends Camera, Document {}

const cameraSchema = new Schema<Camera>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  serviceID: {
    type: String,
    required: true,  
    unique: true  
  },
  serviceType: {
    type: String,
    required: true,    
  }
},
  {
    timestamps: true
  });

const Camera = model<CameraDocument>('Camera', cameraSchema);

export default Camera
