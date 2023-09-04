import { Types, HydratedDocument } from "mongoose";

interface CourseScores {
    dsa: number | null;
    react: number | null;
    webd: number | null;
}

interface IStudent {
    name: string;
    email: string;
    phone: string;
    college: string;
    status: 'placed' | 'not placed';
    courseScores: CourseScores
}

interface IEmployee {
    name: string;
    email: string;
    password: string;
    validatePassword(data: string): Promise<boolean>;
}

interface IInterview {
    company: string;
    date: Date;
}

interface IInterviewResult {
    interview: Types.ObjectId | HydratedDocument<IInterview>;
    student: Types.ObjectId | HydratedDocument<IStudent>;
    result: 'passed' | 'failed' | 'on hold' | "didn't attempt";
}


