import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import mongoose, { Date } from "mongoose";
// import { SeatModel, SeatSchemaClass } from "./SeatDetailSchema";

class BusClass {

    @prop({ required: true, unique: true })
    busNumber!: number;
    @prop()
    date?: string;
    @prop()
    departureTime?: string;
    @prop()
    arrivalTime?: string;
    @prop()
    durationToReachDestination?: string; //https://stackoverflow.com/questions/29745873/hour-difference-between-two-timeshhmmss-ain-momentjs
    @prop()
    agencyName?: string;
    @prop()
    purchase_Year?: number
    @prop()
    isBusDeluxOrSuperDelux?: string
    @prop()
    brandName?: string
    @prop()
    busRouteFrom!: string;
    @prop()
    busRouteTo!: string;
}
export default BusClass