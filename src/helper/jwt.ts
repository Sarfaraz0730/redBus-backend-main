
import jsonwebtoken from "jsonwebtoken";
import { NextFunction } from "express";

require('dotenv').config()

const verify = (req: any, res: any, next: NextFunction) => {
    let bearerHeader = req.headers["authorization"]?.split(" ")[1] || req.body.token || req.query.token

    var token;
    token = bearerHeader

    jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "", function (err: any, decoded: any) {
        if (err) {
            req.aurhenticated = false;
            req.decoded = null;
            next(err)
        } else {
            req.decoded = decoded;
            req.aurhenticated = true
            next()
        }
    })
}
export {

    verify
}