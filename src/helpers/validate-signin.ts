import signinValidator from "@/validators/sign-in";
import { SignInInfo } from "@/types/validation-result";
import { error, success } from "./result-builder";

// Validates /sign-in 
// route handlers
export default function validateSignIn(email: string, password: string): Result<SignInInfo> {

    const result = signinValidator.safeParse({ email, password });

    if (result.success === false) {
        const errors = result.error.errors.map(({ path, message }) => ({ path: path[0]?.toString(), message }));
        return error(errors);
    }

    return success(result.data);
}