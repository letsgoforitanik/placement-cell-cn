import { z } from "zod";

import signupValidator from "@/validators/sign-up";
import signinValidator from "@/validators/sign-in";
import addStudentValidator from "@/validators/add-student";
import editScoreValidator from "@/validators/edit-score";

type SignUpInfo = z.infer<typeof signupValidator>;
type SignInInfo = z.infer<typeof signinValidator>;
type StudentAddInfo = z.infer<typeof addStudentValidator>;
type CourseScoreEditInfo = z.infer<typeof editScoreValidator>;