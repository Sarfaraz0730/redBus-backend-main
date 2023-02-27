
import express from "express"
import mongoose from "mongoose";
import { SeatModel, UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router()

router.patch("/", verify, async (req: any, res: any, next: any) => {

     const decoded = req.decoded
     let queryData = req.query;

     var getUserId = await UserModel.findOne({ username: decoded.user })
     var isSeatBook = await SeatModel.findById({ _id: new mongoose.Types.ObjectId(queryData.seatId) })

     if (isSeatBook?._id == "") {

          return res.status(400).send("The User has already cancel this seat")
     }

     else if (isSeatBook?.seatStatus == "BOOKED") {
          let seatInfo = await SeatModel.updateOne({ _id: new mongoose.Types.ObjectId(queryData.seatId) },
               {
                    $unset: {
                         seatStatus: queryData.seatStatus = "",
                         userId: getUserId?._id
                    }
               })
          return res.status(200).send("Your Seat is Deleted ")
     }
     return res.status(404).send(`userId ${queryData.seatId} and seatId ${queryData.seatId} are undefined`)
})

export default router
