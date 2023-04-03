"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cameraSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
const Camera = (0, mongoose_1.model)('Camera', cameraSchema);
exports.default = Camera;
//# sourceMappingURL=camera.model.js.map