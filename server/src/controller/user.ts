import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../lib/errorHandler";
import User from "../model/user";
import { sendToken } from "../lib/sendToken";
import Activity from "../model/activity";

export const signUpUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("please provide all required values", 400))
    }
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        return next(new ErrorHandler("User already exists with this Email", 400))
    }

    const user = await User.create({ name, email, password });
    sendToken(user, 200, res);

})

export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("please provide email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }
    const verifyPassword = await user.comparePassword(password);

    if (!verifyPassword) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }

    sendToken(user, 200, res);
})

export const logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
})

export const currentUser = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("User not found", 401))
    }

    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

export const getUserActivities = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("You are not Authenticated ", 401));
    }
    const { id: userId } = req.params;
    if (!userId || userId !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not Authenticated ", 401));
    };


    const activities = await Activity.find({ user: userId });

    res.status(200).json({
        success: true,
        activities,
    });
}
);