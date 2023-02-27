import express from "express";
import { verify } from "../../helper/jwt";
import mongoose from "mongoose";
import { SeatModel, UserModel } from "../../dbs";
const router = express.Router();



router.get("/", verify, async (req: any, res: any, next: any) => {
     const decoded = req.decoded
     let queryData = req.query;
     var getUserId = await UserModel.findOne({ username: decoded.user })


     var isSeatBook = await SeatModel.findById({ _id: new mongoose.Types.ObjectId(queryData.seatId) })
     if (isSeatBook?.seatStatus == "BOOKED") {
          return res.send("This Seat is  Already Booked")
     }
     else if (isSeatBook?.seatStatus !== "BOOKED") {
          let seatInfo = await SeatModel.updateOne({ _id: queryData.seatId },
               {
                    $set: {
                         seatStatus: queryData.seatStatus = "BOOKED",
                         userId: getUserId?._id
                    },

               })
          return res.status(200).send("Your Seat is confirmed")
     }
     return res.status(404).send(" Seat Not Found")
})

export default router