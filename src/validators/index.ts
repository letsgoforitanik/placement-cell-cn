import { ZodType } from "zod";
import signupValidator from "./sign-up";

const validators: Record<string, ZodType> = {
    '/sign-up': signupValidator,
};

export default validators;