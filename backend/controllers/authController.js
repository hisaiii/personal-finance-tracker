import jwt from 'jsonwebtoken'
import User from '../models/User.js'
//generate jwt token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

//register user
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageURL } = req.body

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "all fields are required" })
    }
    try {
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
            return res.status(400).json({ message: "email already in use by some user" })

        }
        //db me naya object dal diya user class ka   
        //stored in db 
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageURL
        })
        //front end ko bhej raha
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)

        })
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message })
    }

}

export const loginUser = async (req, res) => {
    const {password,email} = req.body
     
    if (!email || !password) {
        return res.status(400).json({ message: "all fields are required" })

    }

    try {
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" })

        }
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
          
        })

    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message })
    }
}

export const getUserInfo = async (req, res) => {
      try{
        const user= await User.findById(req.user.id).select("-password")

        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user)
      }catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message })
    } 
}

// add this at the bottom of authController.js
import { invalidateCache, CacheKeys } from '../middleware/cache.js';

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user?._id?.toString() || req.user?.id;

    // clear all cached data for this user
    if (userId) {
      await invalidateCache(
        CacheKeys.userProfile(userId),
        CacheKeys.dashboard(userId),
        CacheKeys.allIncome(userId),
        CacheKeys.allExpense(userId),
      );
    }

    // destroy session — clears Splitwise token from Redis
    req.session.destroy((err) => {
      if (err) console.warn('[Logout] Session destroy error:', err.message);
    });

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during logout' });
  }
};