import { ZodType } from "zod";

import signupValidator from "./sign-up";
import signinValidator from "./sign-in";
import addStudentValidator from "./add-student";
import editStudentValidator from "./edit-student";
import editScoreValidator from "./edit-score";
import addInterviewValidator from "./add-interview";
import editInterviewValidator from "./edit-interview";
import updateInterviewStatusValidator from "./update-interview-status";

const validators: Record<string, ZodType> = {
    '/sign-up': signupValidator,
    '/sign-in': signinValidator,
    '/students/add': addStudentValidator,
    '/students/update': editStudentValidator,
    '/students/course-scores/update': editScoreValidator,
    '/interviews/add': addInterviewValidator,
    '/interviews/update': editInterviewValidator,
    '/interviews/update-status': updateInterviewStatusValidator
};

export default validators;