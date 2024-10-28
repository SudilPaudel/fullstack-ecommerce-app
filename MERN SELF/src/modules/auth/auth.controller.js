require('dotenv').config()
const mailSvc = require('../../services/mail.service')
const authSvc = require('./auth.service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class AuthController {
    register =async(req, res, next)=>{
        try{

            const data = authSvc.transformRegisterData(req)
            //Todo: DB store
            const registeredData= await authSvc.createUser(data)

            //mail sned function
            await mailSvc.sendEmail(
                registeredData.email,
                "Activate your Ecommerce Account",
                `Dear ${registeredData.name} <br/>
                <p>You have registered your account with username <strong>${registeredData.email}</strong>.</p><br/>
                <p>Please click the link or copy and paste the url into your browser to activate your account</p>
                <a href="${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
                    Click here
                </a><br/>
                <a href="${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
                    ${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}
                </a><br/>
                <p>Regards</p>
                <p>${process.env.SMTP_FROM}</p>
                <p><small>Please donot reply to this email via any mail service</small></p>

                `
            )
            res.json({
                result: registeredData,
                messege: "Register Success",
                meta: null,
            })
        }
        catch(exception){
            next(exception)
        }
    }
    activate = async(req, res, next)=>{
        try{
            const token = req.params.token;
                //TODO:
            const associatedUser = await authSvc.findOneUser({
                activationToken: token
            })
            if(!associatedUser){
                throw{code: 400, message: "Token doesnt exist"}
            }

            const updateResult = await authSvc.updateUser({
                activationToken: null,
                status: "active"
            }, associatedUser._id)

            res.json({
                result: updateResult,
                message: "Your account has been activated successfully",
                meta: null
            })
                // status ==> active
                //activationTOken ==> null
            }catch(exception){
            next(exception)
        }
    }
    login =async(req, res, next)=>{
        try{
            const {email , password}= req.body;
            //validate email xa ki xaina 
            const userDetail = await authSvc.findOneUser({
                email: email
            })
            // if user xaina vane
            if(!userDetail){
                throw{code: 422, message: "User doesnot exists..."}
            }
            // user exists
            //password Compare
            if(bcrypt.compareSync(password, userDetail.password)){
                //password match vayo 
                if(userDetail.status !== 'active'){
                    throw{code: 400, message: "Your account is not activated. Please activate it or contact the admin staff"}
                }
                //user is active
                const accessToken = jwt.sign({
                    sub: userDetail._id,

                }, process.env.JWT_SECRET)
                const refreshToken = jwt.sign({
                    sub: userDetail._id,

                }, process.env.JWT_SECRET,{
                    expiresIn: "1d"
                })
                res.json({
                    result:{
                        detail:{
                            _id: userDetail._id,
                            name: userDetail.name,
                            email: userDetail.email,
                            role: userDetail.role,
                            status: userDetail.status,
                            image: userDetail.image
                        },
                        token:{
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        }
                    },
                    message: "Successfully Logged In",
                    meta: null
                })
            }else{
                //password match vayena
                throw{code: 400, message: "Credentials doesnot match"}
            }
        }catch(exception){
            next(exception)
        }
    }
    getLoggedIn = async(req,res,next)=>{
        try{
            //verify if the user is logged in or not 
            const loggedInUser = req.authUser;
            const response = {
                _id: loggedInUser._id,
                name: loggedInUser.name,
                email: loggedInUser.email,
                role: loggedInUser.role,
                status: loggedInUser.status,
                image: loggedInUser?.image
            }
            res.json({
                result: response,
                message: "Your Profile",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    adminAccess = (req, res, next)=>{
        try{
            const data= req.authUser;
            res.json({
                result: data,
                message: "Success",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }

}

const authCtrl = new AuthController()
module.exports = authCtrl
