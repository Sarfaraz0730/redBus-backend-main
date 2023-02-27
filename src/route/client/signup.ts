import { UserModel } from "../../dbs";
import express from "express"
let router = express.Router();

router.post("/", async (req: any, res: any, next: any) => {
    const data = req.body;
    const username = req.body

    let isUserAlreadyExist = await UserModel.findOne({ username: data.username })

    if (isUserAlreadyExist) {
        return res.status(400).send("User with this name  Exist")
    }
    if (!isUserAlreadyExist) {
        try {
            await UserModel.create(data);
        } catch (error) {
            console.log({ error });
            next(error)
            return
        }
        return res.status(200).send(data);
    }
})
export default router