# CameraManagement_DAL

This project is a DataAccess Layer for camera management system built using Node.js, Express, and MongoDB. It allows users to perform CRUD operation on create and manage cameras and camera networks.

<!----------------------------------------------------- Getting Started ------------------------------------------->
To get started with this project, clone the repository to your local machine and run the following commands:
Copy code
npm install
npm start
This will install the necessary dependencies and start the server. You can then access the API at http://localhost:3000.

<!----------------------------------------------------- API Endpoints---------------------------------------------->
<!-- Cameras -->
GET /api/v_1/cameras: Get a list of all cameras
GET /api/v_1/cameras/:id: Get details for a specific camera
POST /api/v_1/cameras/add: Create a new camera
PUT /api/v_1/cameras/update/:id: Update an existing camera
DELETE /api/v_1/cameras/delete/:id: Delete a camera

<!-- Camera Networks -->
GET /api/v_1/camera_networks: Get a list of all camera networks
GET /api/v_1/camera_networks/:id: Get details for a specific camera network
POST /api/v_1/camera_networks/add: Create a new camera network
PUT /api/v_1/camera_networks/update/:id: Update an existing camera network
DELETE /api/v_1/camera_networks/delete/:id: Delete a camera network

<!--------------------------------------------------------- Schema ------------------------------------------------>
<!-- Camera -->
name: String (required) 
description: String (required)
url: String (required)
location: String (required)
isActive: Boolean (default true)
serviceID: String (required)
serviceType: String (required)

<!-- Camera Network -->
name: String (required)
description: String (required)
cameras: Array of Camera IDs (required)
isActive: Boolean (default true)
ipAddress: String (required)
networkServiceID: String (required)

<!--------------------------------------------------------Dependencies -------------------------------------------->
This project uses the following dependencies:
express - Web server framework
mongoose - MongoDB ORM


