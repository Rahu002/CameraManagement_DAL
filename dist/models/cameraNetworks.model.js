"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cameraNetworksSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    cameras: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Camera'
        }],
    networkServiceID: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    ipAddress: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const CameraNetworks = (0, mongoose_1.model)('CameraNetworks', cameraNetworksSchema);
exports.default = CameraNetworks;
//# sourceMappingURL=cameraNetworks.model.js.map