import { Schema, model } from "mongoose";
import { IStudentInterviewStatus } from "@/types/model";

const schema = new Schema<IStudentInterviewStatus>(
    {
        interview: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Interview'
        },
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
        result: {
            type: Schema.Types.String,
            required: true,
            enum: ["appearing", "passed", "failed", "on hold", "didn't attempt"]
        }
    },
    {
        timestamps: true
    }
);

const StudentInterviewStatus = model<IStudentInterviewStatus>('StudentInterviewStatus', schema);

export default StudentInterviewStatus;