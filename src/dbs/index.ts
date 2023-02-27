import { getModelForClass } from "@typegoose/typegoose";
import BusClass from "../classes/BusClass";
import SeatClass from "../classes/SeatClass";
import UserClass from "../classes/UserClass";

const UserModel = getModelForClass(UserClass, { schemaOptions: { collection: "users_S", timestamps: true } });
const BusModel = getModelForClass(BusClass, { schemaOptions: { collection: "busModel_S", timestamps: true } });
const SeatModel = getModelForClass(SeatClass, { schemaOptions: { collection: "busSeat_S", timestamps: true } });
export {
    UserModel, BusModel, SeatModel
}
