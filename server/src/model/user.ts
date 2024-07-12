import mongoose from "mongoose";
import type { TUser } from "../types/user";
import Activity from "./activity";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import validator from "validator";
dotenv.config();

const userSchema = new mongoose.Schema<TUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    activity: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Activity",
        }
    ]

},
    { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

userSchema.methods.createJWT = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
userSchema.methods.comparePassword = async function (givenPassword: string) {
    const isMatch = await bcrypt.compare(givenPassword, this.password);
    return isMatch;
}
export default mongoose.model<TUser>('User', userSchema);