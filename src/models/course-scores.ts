import { Schema, model } from "mongoose";
import { ICourseScores } from "@/types/model";

const courseScoresSchema = new Schema<ICourseScores>(
    {
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Student'
        },
        dsaFinalScore: {
            type: Schema.Types.Number
        },
        reactFinalScore: {
            type: Schema.Types.Number
        },
        webdFinalScore: {
            type: Schema.Types.Number
        }
    },
    {
        timestamps: true
    }
);

const CourseScores = model<ICourseScores>('CourseScores', courseScoresSchema);

export default CourseScores;