import { BusModel } from "../../dbs";
const express = require("express");
const router = express.Router();

router.post("/", async (req: any, res: any, next: any) => {
    const data = req.body;
    try {
        await BusModel.create(data);
    } catch (error) {
        console.log({ error });
        next(error)
        return
    }
    return res.send(data);
})

router.get("/", async (req: any, res: any, next: any) => {
    var data = req.query
    try {
        let busInfo = await BusModel.find({
            $and: [{ busRouteFrom: { $eq: data.busRouteFrom } }, { busRouteTo: { $eq: data.busRouteTo } },
            { date: { $eq: data.date } },
            ]
        })
        if (busInfo.length === 0) {
            return res.status(404).send(" No Bus Found");
        }
        else {

            return res.send(busInfo);
        }
    } catch (err) {
        return res.status(400).send("Please enter Valid Detail of Bus")
    }

})
export default router