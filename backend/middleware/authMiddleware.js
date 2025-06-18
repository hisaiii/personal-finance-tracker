import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect= async (req,res,next) => {
    let token=req.headers.authorization?.split(" ")[1]  //header me store rehta token i.e "bearer token" so is se bearer hat jayega
    if(!token){
return res.status(401).json({message:"Not authorised,no token"})
    } 
    
        try{
            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            console.log("Token received:", token)

            //storing this in the name of user and passing it samne , i can name it anything like req.samosa
            req.user=await User.findById(decoded.id).select('-password')  //exclude password
            next();
        }catch(err){
                     

            res.status(401).json({message:"Not authorised,token fail"})
        }
}