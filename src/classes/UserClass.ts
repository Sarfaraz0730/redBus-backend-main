import { pre, prop, ReturnModelType } from "@typegoose/typegoose";
import bcrypt from 'bcrypt';
import { UserModel } from "../dbs";

@pre<UserClass>('save', function () {
    if (!this.isModified('password')) {
        return;
    }
    const hashedPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashedPassword;
})
class UserClass {
    static findByIdAndUpdate(arg0: { oldUserData: string | undefined; }, arg1: { newUserName: any; }) {
        throw new Error("Method not implemented.");
    }
    static findOneAndUpdate(arg0: { oldUserData: string | undefined; }, arg1: { data: any; "": any; }) {
        throw new Error("Method not implemented.");
    }

    @prop({ required: true, maxlength: 30, minlength: 3, trim: true, unique: true })
    username!: string;

    @prop({ required: true, trim: true, })
    password!: string;

    @prop({ required: true, unique: true, trim: true, match: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })
    email?: string

    @prop()
    dob?: string;

    @prop({ default: "MALE" })
    gender?: string;
    @prop()
    phoneCode?: string;

    @prop({ match: /^[0-9]{10}$/ })
    phoneNumber?: string;

    static async comparePassword(username: string, password: string) {

        const doc = await UserModel.findOne({ username });
        if (!doc) return false;

        return bcrypt.compareSync(password, doc.password);
    }
}
export default UserClass