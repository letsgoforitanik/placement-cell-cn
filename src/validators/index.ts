import { ZodType } from "zod";

import signupValidator from "./sign-up";
import signinValidator from "./sign-in";
import addStudentValidator from "./add-student";
import editStudentValidator from "./edit-student";
import editScoreValidator from "./edit-score";
import addInterviewValidator from "./add-interview";
import editInterviewValidator from "./edit-interview";

const validators: Record<string, ZodType> = {
    '/sign-up': signupValidator,
    '/sign-in': signinValidator,
    '/students/add': addStudentValidator,
    '/students/:id/edit': editStudentValidator,
    '/students/course-scores/:id/edit': editScoreValidator,
    '/interviews/add': addInterviewValidator,
    '/interviews/:id/edit': editInterviewValidator
};

export default validators;