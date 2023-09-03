import { ZodType } from "zod";

import signupValidator from "./sign-up";
import signinValidator from "./sign-in";
import addStudentValidator from "./add-student";
import editStudentValidator from "./edit-student";

const validators: Record<string, ZodType> = {
    '/sign-up': signupValidator,
    '/sign-in': signinValidator,
    '/students/add': addStudentValidator,
    '/students/:id/edit': editStudentValidator
};

export default validators;