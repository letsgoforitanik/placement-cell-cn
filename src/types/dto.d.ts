import { IEmployee, IStudent, CourseScores, IInterview } from "./model";

// Dto or Data Transfer Object
// The service layer takes these as input
// and also returns them

// Rather than returning models, or consuming models
// dealing with outside world, using this dto types are
// more convenient, because, these types are composed
// only using core javascript types

type EmployeeCreateDto = Omit<IEmployee, "validatePassword">;
type StudentCreateDto = IStudent;
type StudentUpdateDto = IStudent & { id: string };
type CourseScoreUpdateDto = CourseScores & { id: string };
type InterviewCreateDto = IInterview;
type InterviewUpdateDto = IInterview & { id: string };