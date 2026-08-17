import express from 'express';
import passport from 'passport';
import axios from 'axios';
import { protect } from '../middleware/authMiddleware.js'; // Your JWT auth middleware
import { setToken,getSplitwiseDashboard ,getStatus,disconnect} from '../controllers/splitwiseController.js';
const router = express.Router();
router.get('/connect', passport.authenticate('oauth2',{session: false}));
//after this /connect .../callback is triggered
//where passport converts auth code to access token 
//then store that token into the session and redirect it to dashboard 
router.get('/callback',passport.authenticate('oauth2', { failureRedirect: '/' ,session: false}),setToken);

// Protect the me route with your existing auth
router.get('/me', protect, getSplitwiseDashboard);

// Check connection status - also protect this route
router.get('/status',protect,getStatus);

// Disconnect Splitwise session
router.post('/disconnect', protect, disconnect);


export default router;