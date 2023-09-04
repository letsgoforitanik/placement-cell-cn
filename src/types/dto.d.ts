import { IEmployee, IStudent, CourseScores, IInterview } from "./model";

type EmployeeCreateDto = Omit<IEmployee, "validatePassword">;
type StudentCreateDto = IStudent;
type StudentUpdateDto = IStudent & { id: string };
type CourseScoreUpdateDto = CourseScores & { id: string };
type InterviewCreateDto = IInterview;
type InterviewUpdateDto = IInterview & { id: string };