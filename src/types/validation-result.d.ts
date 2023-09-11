import { z } from "zod";

import signupValidator from "@/validators/sign-up";
import signinValidator from "@/validators/sign-in";
import addStudentValidator from "@/validators/add-student";
import editScoreValidator from "@/validators/edit-score";
import addInterviewValidator from "@/validators/add-interview";
import editInterviewValidator from "@/validators/edit-interview";
import updateInterviewStatusValidator from "@/validators/update-interview-status";

// These types are the types of the result object
// result object are the output of validators
// after successful validation, validators return 
// the transformed object, which we can obtain through
// req.validationResult. These types represent the type
// of validationResult. 

type SignUpInfo = z.infer<typeof signupValidator>;
type SignInInfo = z.infer<typeof signinValidator>;
type StudentAddInfo = z.infer<typeof addStudentValidator>;
type CourseScoreEditInfo = z.infer<typeof editScoreValidator>;
type InterviewAddInfo = z.infer<typeof addInterviewValidator>;
type InterviewEditInfo = z.infer<typeof editInterviewValidator>;
type InterviewStatusEditInfo = z.infer<typeof updateInterviewStatusValidator>;