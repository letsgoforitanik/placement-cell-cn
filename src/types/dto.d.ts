import { IEmployee, IStudent } from "./model";

type EmployeeCreateDto = Omit<IEmployee, "validatePassword">;
type StudentCreateDto = IStudent;
type StudentUpdateDto = IStudent & { id: string };