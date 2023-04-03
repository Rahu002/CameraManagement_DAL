import { Schema, model } from 'mongoose';
import { CameraDocument } from './camera.model';

interface CameraNetwork {
  name: string;
  description: string;
  cameras: CameraDocument['_id'][];  
  isActive:boolean;
  ipAddress : string;
  networkServiceID: string;
}

const cameraNetworksSchema = new Schema<CameraNetwork>({
  name: {
    type: String,
    required: true,
    
  },
  description: {
    type: String,
    required: true
  },
  cameras: [{
    type: Schema.Types.ObjectId,
    ref: 'Camera'
  }],  
  networkServiceID:{
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true,   
  },
  ipAddress: {
    type: String,
    required: true
  }, 
},
{
  timestamps: true
});


const CameraNetworks = model<CameraNetwork>('CameraNetworks', cameraNetworksSchema);

 export default CameraNetworks