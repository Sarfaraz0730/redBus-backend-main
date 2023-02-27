import { mongoose } from "@typegoose/typegoose";
import express from "express";
import { SeatModel, UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";

const router = express.Router();

router.get("/", verify, async (req: any, res: any, next: any) => {
     const decoded = req.decoded;

     const decodedUser = decoded.user
     const data = req.body

     const userDetail = await UserModel.findOne({ username: decodedUser })
     if (userDetail) {
          const pipeline =
               [{
                    $match: {
                         //  _id: ObjectId('636c98b88f4d00b98933bc4a')
                         _id: new mongoose.Types.ObjectId(userDetail._id)
                    }
               }, {
                    $lookup: {
                         from: 'busSeat_S',
                         localField: '_id',
                         foreignField: 'userId',
                         as: 'result'
                    }
               }, {
                    $unwind: {
                         path: '$result'
                    }
               }, {
                    $project: {
                         username: 1,
                         email: 1,
                         dob: 1,
                         gender: 1,
                         phoneNumber: 1,
                         seatId: '$result._id',
                         seatNumber: '$result.seatNumber',
                         price: '$result.price',
                         isItWindowSeat: '$result.isItWindowSeat',
                         busId: '$result.busId',
                         userId: '$_id',
                         _id: 0
                    }
               }, {
                    $lookup: {
                         from: 'busModel_S',
                         localField: 'busId',
                         foreignField: '_id',
                         as: 'bus'
                    }
               }, {
                    $unwind: {
                         path: '$bus'
                    }
               }, {
                    $project: {
                         username: 1,
                         email: 1,
                         dob: 1,
                         gender: 1,
                         phoneNumber: 1,
                         seatId: 1,
                         seatNumber: 1,
                         price: 1,
                         isItWindowSeat: 1,
                         busId: 1,
                         userId: 1,
                         busNumber: '$bus.busNumber',
                         date: '$bus.date',
                         departureTime: '$bus.departureTime',
                         arrivalTime: '$bus.arrivalTime',
                         durationToReachDestination: '$bus.durationToReachDestination',
                         agencyName: '$bus.agencyName',
                         brandName: '$bus.brandName',
                         busRouteFrom: '$bus.busRouteFrom',
                         busRouteTo: '$bus.busRouteTo'
                    }
               },]
          const wholeInfoOfSeatAndUser = await UserModel.aggregate(pipeline).exec()
          res.send(wholeInfoOfSeatAndUser)
     }
     else {
          return res.send(400).status("UserId not found")
     }
})

export default router