import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import BusClass from "./BusClass";
import UserClass from "./UserClass";

class SeatClass {

    @prop({ required: true, unique: true })
    seatNumber!: number;

    @prop()
    seatStatus?: string;

    @prop()
    price?: number;

    @prop()
    isItWindowSeat?: boolean

    @prop({ ref: BusClass })
    busId!: mongoose.Types.ObjectId

    @prop({ ref: UserClass })
    userId?: mongoose.Types.ObjectId
}

export default SeatClass