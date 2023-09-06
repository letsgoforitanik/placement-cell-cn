import { z } from "zod";

const updateInterviewStatusValidator = z.object({
    interviewId: z.string().nonempty("Id field can't be blank"),
    studentId: z.string().nonempty("Student Id field can't be blank"),
    status: z.enum(["appearing", "passed", "failed", "on hold", "didn't attempt"], {
        errorMap: () => ({ message: 'Invalid status value' })
    })
});

export default updateInterviewStatusValidator;