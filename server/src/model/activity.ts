import mongoose from "mongoose";
import type { TActivity } from "../types/activity";

const activitySchema = new mongoose.Schema<TActivity>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "ongoing", "paused"],
        default: "pending",
    },
    totalActiveDuration: {
        type: Date,
        default: new Date(0),
    },
    lastResumedAt: {
        type: Date,
        default: new Date(0),
    },
    logs: [
        {
            action: {
                type: String,
                enum: ["pending", "completed", "ongoing", "paused"],
            },
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],


},
    { timestamps: true }
);

export default mongoose.model<TActivity>('Activity', activitySchema);