import { Schema, model } from "mongoose";
import { IInterviewResult } from "@/types/model";

const interviewResultSchema = new Schema<IInterviewResult>(
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
            enum: ["passed", "failed", "on hold", "didn't attempt"]
        }
    },
    {
        timestamps: true
    }
);

const InterviewResult = model<IInterviewResult>('InterviewResult', interviewResultSchema);

export default InterviewResult;