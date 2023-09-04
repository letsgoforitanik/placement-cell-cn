import { Schema, model } from "mongoose";
import { IInterview } from "@/types/model";

const interviewSchema = new Schema<IInterview>(
    {
        company: {
            type: Schema.Types.String,
            required: true
        },
        date: {
            type: Schema.Types.Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Interview = model<IInterview>('Interview', interviewSchema);

export default Interview;