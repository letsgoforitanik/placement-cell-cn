import { z } from "zod";

const signupValidator = z
    .object({
        name: z.string().min(6, "Name must be at least 6 characters long"),
        email: z.string().email("Not a valid email"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .refine((val) => /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,20}$/.test(val), "Password must contain letters and numbers"),
        retypedPassword: z.string(),
    })
    .refine(({ password, retypedPassword }) => password === retypedPassword, {
        message: 'Confirm password please',
        path: ['retypedPassword']
    })
    .transform(({ name, email, password }) => ({ name, email, password }));


export default signupValidator;
