import { Types, HydratedDocument } from "mongoose";

interface IStudent {
    name: string;
    email: string;
    phone: string;
    college: string;
    status: 'placed' | 'not placed';
}

interface IEmployee {
    name: string;
    email: string;
    password: string;
    validatePassword(data: string): Promise<boolean>;
}

interface ICourseScores {
    student: Types.ObjectId | HydratedDocument<IStudent>;
    dsaFinalScore?: number;
    reactFinalScore?: number;
    webdFinalScore?: number;
}

interface IInterview {
    companyName: string;
    date: Date;
}

interface IInterviewResult {
    interview: Types.ObjectId | HydratedDocument<IInterview>;
    student: Types.ObjectId | HydratedDocument<IStudent>;
    result: 'passed' | 'failed' | 'on hold' | "didn't attempt";
}


