import express from "express"
import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "../../dbs";

let router = express.Router();

router.post("/", async (req: any, res: any, next: any) => {
    const { username, password } = req.body;

    const matched = await UserModel.comparePassword(username, password);
    if (matched) {
        return res.json({
            token: jsonwebtoken.sign({ user: username }, process.env.JWT_SECRET ?? ""),
            message: "Success"
        });

    } else {
        return res.status(401).json({ message: "The username and password  are invalid" })
    }
})

export default router