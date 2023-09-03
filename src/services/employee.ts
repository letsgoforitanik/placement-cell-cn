import { Employee } from "@/models";
import { error, success } from "@/helpers";
import { EmployeeCreateDto } from "@/types/dto";

export async function addEmployee(data: EmployeeCreateDto) {
    const count = await Employee.findOne({ email: data.email }).count();
    if (count > 0) return error('Employee already exists');
    const employee = await Employee.create(data);
    return success(employee);
}

export async function findEmployeeByEmail(email: string) {
    const employee = await Employee.findOne({ email });
    if (!employee) return error('Employee not found');
    return success(employee);
}

export async function findEmployeeById(id: string) {
    const employee = await Employee.findById(id);
    if (!employee) return error('Employee not found');
    return success(employee);
}