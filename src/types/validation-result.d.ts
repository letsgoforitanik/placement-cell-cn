import { z } from "zod";

import signupValidator from "@/validators/sign-up";
import signinValidator from "@/validators/sign-in";
import addStudentValidator from "@/validators/add-student";

type SignUpInfo = z.infer<typeof signupValidator>;
type SignInInfo = z.infer<typeof signinValidator>;
type StudentAddInfo = z.infer<typeof addStudentValidator>;