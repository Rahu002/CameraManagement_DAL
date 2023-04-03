"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
** Requring all the dependencies
**/
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const camera_routes_1 = __importDefault(require("./routes/camera.routes"));
const cameraNetworks_routes_1 = __importDefault(require("./routes/cameraNetworks.routes"));
/**
** Create an Express.js application
**/
const app = (0, express_1.default)();
/**
** Setup the middleware
**/
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/**
** CRUD Api routes
**/
app.use('/api/v_1/camera', camera_routes_1.default);
app.use('/api/v_1/camera_networks', cameraNetworks_routes_1.default);
/**
**  Database Connection and Server Instance functions
**/
const connectionString = "mongodb://localhost:27017/CameraManagement";
mongoose_1.default.connect(connectionString);
const connection = mongoose_1.default.connection;
connection.on('open', () => {
    console.log('Connected to Database......');
    app.listen(3000, () => {
        console.log('Server is listening in port 3000');
    });
});
//# sourceMappingURL=app.js.map