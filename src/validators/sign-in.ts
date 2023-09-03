import { z } from 'zod';

const signinValidator = z.object({
    email: z.string().nonempty("Email field can't be blank").email("Not a valid email"),
    password: z.string().nonempty("Password field can't be blank")
});

export default signinValidator;