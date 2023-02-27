import express from "express"
import { findConfigFile } from "typescript";
import { UserModel } from "../../dbs";
import { verify } from "../../helper/jwt";
let router = express.Router();

router.get("/", verify, async (req: any, res: any, next: any) => {
    const username = req.decoded.user
    const userAllInfo = await UserModel.findOne({ username })
    res.status(200).send(userAllInfo);

})
export default router