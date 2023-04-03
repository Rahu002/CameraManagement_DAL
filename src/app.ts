
/**  
** Requring all the dependencies 
**/
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cameraRoutes from './routes/camera.routes';
import cameraNetworksRoutes from './routes/cameraNetworks.routes';


/**  
** Create an Express.js application
**/
const app = express();

/**  
** Setup the middleware
**/
app.use(express.json());
app.use(cors());

/**  
** CRUD Api routes
**/
app.use('/api/v_1/camera', cameraRoutes);
app.use('/api/v_1/camera_networks', cameraNetworksRoutes);

/**  
**  Database Connection and Server Instance functions
**/
const connectionString = "mongodb://localhost:27017/CameraManagement"
mongoose.connect(connectionString)
const connection = mongoose.connection
connection.on('open', () => {
    console.log('Connected to Database......')
    app.listen(3000,() => {
        console.log('Server is listening in port 3000')
    })
})

