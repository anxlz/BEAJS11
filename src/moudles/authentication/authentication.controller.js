import { Router } from "express";
import { confirmTwoStepVerification, enableTwoStepVerification, getprofileByID, login, loginConfirmation, loginWithGmail, signup } from "./authentication.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
import { authentication } from "../../middleware/authentication/authentication.middleware.js";
import { validation } from "../../middleware/validation/validation.middleware.js";
import * as authValidation from "./authentication.validation.js";
const router=Router()


router.post("/signup",validation(authValidation.signup),async (req , res ,next)=>{
    const data=await signup(req.body)
    return sucessresponse({res,data,status:201})
})


router.post("/login",validation(authValidation.login),async(req,res,next)=>{
    const data=await login(req.body,`${req.protocol}://${req.headers.host}`)
    return sucessresponse({res,data})
})


// Confirm Login (2-Step Verification)
router.post("/login/confirm",validation(authValidation.loginConfirmation),async(req,res,next)=>{
    const data=await loginConfirmation(req.body,`${req.protocol}://${req.headers.host}`)
    return sucessresponse({res,data})
})


router.post("/login-with-gmail",validation(authValidation.loginWithGmail),async(req,res,next)=>{
    const data=await loginWithGmail(req.body,`${req.protocol}://${req.headers.host}`)
    return sucessresponse({res,data})
})

router.get("/profile",authentication(),async(req,res,next)=>{
    const data=await getprofileByID(req.user._id)
    return sucessresponse({res,data})
})


// Enable 2-Step Verification (sends OTP)
router.post("/two-step-verification/enable",authentication(),async(req,res,next)=>{
    const data=await enableTwoStepVerification(req.user)
    return sucessresponse({res,data})
})


// Confirm Enabling 2-Step Verification
router.patch("/two-step-verification/confirm",authentication(),validation(authValidation.confirmTwoStepVerification),async(req,res,next)=>{
    const data=await confirmTwoStepVerification(req.user,req.body)
    return sucessresponse({res,data})
})

export default router
