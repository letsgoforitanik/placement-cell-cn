import bcrypt from "bcrypt";
import { HydratedDocument, Schema, model } from "mongoose";
import { IEmployee } from "@/types/model";

const employeeSchema = new Schema<IEmployee>(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        password: {
            type: Schema.Types.String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


async function encryptPassword(this: HydratedDocument<IEmployee>) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
}


async function validatePassword(this: HydratedDocument<IEmployee>, data: string) {
    return bcrypt.compare(data, this.password);
}


employeeSchema.pre('save', encryptPassword);

employeeSchema.methods.validatePassword = validatePassword;

const Employee = model<IEmployee>('Employee', employeeSchema);

export default Employee;