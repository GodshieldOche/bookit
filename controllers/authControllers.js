import User from '../models/user'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middleware/catchAsycErrors'
import APIFeatures from '../utils/apiFeatures'
import cloudinary from 'cloudinary'
import absoluteUrl from 'next-absolute-url'
import sendEmail from '../utils/sendEmail'
import crypto from 'crypto'


// setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// resgister User => /api/auth/register
const registerUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale'
    })
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    res.status(200).json({
        success: 'true',
        message: 'registered successfully'
    })
   
})

// current User profile => /api/me
const currentUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id) 

    res.status(200).json({
        success: 'true',
        user
    })

})


// update User profile => /api/me/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name
        user.email = req.body.email

        if (req.body.password) {
            user.password = req.body.password
        }
    }

    // update avatar
    if (req.body.avatar !== '') {
        const image_id = user.avatar.public_id

        // Delete user previous image
        await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    await user.save()

    res.status(200).json({
        success: 'true'
    })

})


// Forgot Password => /api/password/forgot
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body})
    console.log(req.body)

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    // Get reset token 
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    // get origin
    const { origin } = absoluteUrl(req)

    // create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`
    const message = `Your password reset url is as follows: \n\n ${resetUrl} \n\n 
    if you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'BookIT Password Recovery',
            message
        })

        res.status(200).json({
            success: 'true',
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }


})


// Reset Password => /api/password/reset/:token
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // HAsh the URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has expired', 404))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password do not match', 404))
    }

    // set the new password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
        success: 'true',
        message: 'Password updated successfully'
    })

})

// Get all users   =>   /api/admin/users
const allAdminUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})


// Get user details  =>   /api/admin/users/:id
const getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with this ID.', 400))
    }

    res.status(200).json({
        success: true,
        user
    })

})


// Update user details  =>   /api/admin/users/:id
const updateUser = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})


// Delete user    =>   /api/admin/users/:id
const deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with this ID.', 400))
    }

    // Remove avatar 
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id)


    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted"
    })

})

export {
    registerUser,
    currentUserProfile,
    updateProfile,
    forgotPassword,
    resetPassword,
    allAdminUsers,
    getUserDetails,
    updateUser,
    deleteUser,
}