import { Employee } from "@/models";
import { error, success } from "@/helpers";
import { IEmployee } from "@/types/model";

export async function addEmployee(data: IEmployee) {
    const count = await Employee.findOne({ email: data.email }).count();
    if (count > 0) return error('User already exists');
    const user = await Employee.create(data);
    return success(user);
}