
import mongoose, { SchemaTypes, Types } from "mongoose";
import { SeatModel } from "../../dbs";
const express = require("express");
const router = express.Router();


router.post("/", async (req: any, res: any, next: any) => {
    const data = req.body;
    try {
        await SeatModel.create(data);
    } catch (error) {
        console.log({ error });
        next(error)
        return
    }
    res.send(data);
})

router.get("/", async (req: any, res: any, next: any) => {
    var data = req.query
    let busId = data[0]
    try {
        let seatInfo = await SeatModel.find({ busId: new mongoose.Types.ObjectId(busId) })
        return res.send(seatInfo);
    }
    catch (err) {
        return res.send(err)
    }

})

export default router