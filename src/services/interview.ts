import { success } from "@/helpers";
import { Interview } from "@/models";
import { InterviewCreateDto, InterviewUpdateDto } from "@/types/dto";

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
    return success(null);
}