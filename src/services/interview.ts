import { Types } from "mongoose";
import { Interview, Student, StudentInterviewStatus } from "@/models";
import { InterviewCreateDto, InterviewUpdateDto } from "@/types/dto";
import { success } from "@/helpers";

export async function getInterviews() {
    const interviews = await Interview.find().sort('-updatedAt');
    return success(interviews);
}

export async function addInterview(info: InterviewCreateDto) {
    const interview = await Interview.create(info);
    return success(interview);
}

export async function getInterview(id: string) {
    const interview = await Interview.findById(id);
    return success(interview);
}

export async function updateInterview(info: InterviewUpdateDto) {
    const { id, ...data } = info;
    const interview = await Interview.findByIdAndUpdate(id, data);
    return success(interview);
}


export async function deleteInterview(id: string) {
    await Interview.findByIdAndDelete(id);
    await StudentInterviewStatus.deleteMany({ interview: new Types.ObjectId(id) });
    return success(null);
}


export async function getInterviewInDetails(interviewId: string) {
    const interview = new Types.ObjectId(interviewId);
    const interviewDetails = await Interview.findById(interview);
    const statusDetails = await StudentInterviewStatus.find({ interview }).populate(['student']);
    return success({ interview: interviewDetails, studentsStatus: statusDetails });
}


export async function findUnallocatedStudents(id: string) {
    const interview = await Interview.findById(id);
    const interviewDetails = await StudentInterviewStatus.find({ interview });
    const studentIds = interviewDetails.map(details => details.student);
    const unallocatedStudents = await Student.find({ _id: { $nin: studentIds } });
    return success({ interview, students: unallocatedStudents });
}


export async function addStudentToInterview(interviewId: string, studentId: string) {
    const interview = new Types.ObjectId(interviewId);
    const student = new Types.ObjectId(studentId);
    const interviewStatus = StudentInterviewStatus.create({ interview, student, result: "appearing" });
    return success(interviewStatus);
}


export async function deleteStudentFromInterview(interviewId: string, studentId: string) {
    const interview = new Types.ObjectId(interviewId);
    const student = new Types.ObjectId(studentId);
    await StudentInterviewStatus.findOneAndDelete({ interview, student });
    return success(null);
}


export async function getStudentStatus(interviewId: string, studentId: string) {
    const interview = new Types.ObjectId(interviewId);
    const student = new Types.ObjectId(studentId);
    const status = await StudentInterviewStatus.findOne({ interview, student }).populate(['interview', 'student']);
    return success(status);
}


export async function updateStudentStatus(interviewId: string, studentId: string, status: string) {
    const interview = new Types.ObjectId(interviewId);
    const student = new Types.ObjectId(studentId);
    const newStatus = await StudentInterviewStatus.updateOne({ interview, student }, { result: status });
    return success(newStatus);
}


export async function getPlacementInfo() {
    const info = await StudentInterviewStatus.find().populate(['interview', 'student']);
    return success(info);
}