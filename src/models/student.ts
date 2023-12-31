import { Schema, model } from "mongoose";
import { IStudent } from "@/types/model";

const studentSchema = new Schema<IStudent>(
    {
        name: {
            type: Schema.Types.String,
            required: true,
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        phone: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        college: {
            type: Schema.Types.String,
            required: true,
        },
        status: {
            type: Schema.Types.String,
            required: true,
            enum: ['placed', 'not placed']
        },
        courseScores: {
            type: {
                dsa: Schema.Types.Number,
                react: Schema.Types.Number,
                webd: Schema.Types.Number
            },
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Student = model<IStudent>('Student', studentSchema);

export default Student;