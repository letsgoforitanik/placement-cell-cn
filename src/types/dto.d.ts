import { IEmployee, IStudent, CourseScores } from "./model";

type EmployeeCreateDto = Omit<IEmployee, "validatePassword">;
type StudentCreateDto = IStudent;
type StudentUpdateDto = IStudent & { id: string };
type CourseScoreUpdateDto = CourseScores & { id: string };