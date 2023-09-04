import { error, success } from "@/helpers";
import { Student } from "@/models";
import { StudentCreateDto, StudentUpdateDto } from "@/types/dto";
import { CourseScoreUpdateDto } from "@/types/dto";


export async function addStudent(info: StudentCreateDto) {
    const { phone, email } = info;

    const count = await Student.findOne({ $or: [{ phone }, { email }] }).count();
    if (count > 0) return error('Student already exists with same phone / email');

    const student = await Student.create(info);
    return success(student);
}


export async function getStudents() {
    const students = await Student.find().sort('-updatedAt');
    return success(students);
}


export async function getStudent(id: string) {
    const student = await Student.findById(id);
    return success(student);
}


export async function updateStudent(info: StudentUpdateDto) {
    const student = await Student.findByIdAndUpdate(info.id, info);
    return success(student);
}

export async function deleteStudent(id: string) {
    await Student.findByIdAndDelete(id);
    return success(null);
}

export async function getStudentsCourseScores() {
    const students = await Student.find().select('name email courseScores').sort('-updatedAt');
    return success(students);
}

export async function getStudentCourseScore(id: string) {
    const student = await Student.findById(id).select('name email courseScores');
    return success(student);
}

export async function updateCourseScore(info: CourseScoreUpdateDto) {
    const { id, ...courseScores } = info;
    const student = await Student.findByIdAndUpdate(info.id, { courseScores });
    return success(student);
}