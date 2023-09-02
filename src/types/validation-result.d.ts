import { z } from "zod";
import signupValidator from "@/validators/sign-up";

type SignUpInfo = z.infer<typeof signupValidator>;