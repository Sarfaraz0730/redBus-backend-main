import express from 'express';

import login from './login';
import signup from './signup';
import userProfile from './userProfile';
import busDetails from "./busDetails"
import seatDetails from './seatDetails';
import seatBookingStatus from './seatBookingStatus';
import cancelBookedSeat from './cancelBookedSeat';
import wholeInfo from './wholeInfo';

let router = express.Router();

router.use('/login', login)
router.use('/signup', signup)
router.use("/userProfile", userProfile)
router.use("/busDetails", busDetails)
router.use('/seatDetails', seatDetails)
router.use("/bookingStatus", seatBookingStatus)
router.use("/cancelBookedSeat", cancelBookedSeat)
router.use("/wholeInfo", wholeInfo)



export default router;