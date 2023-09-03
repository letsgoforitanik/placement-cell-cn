import { z } from "zod";

const editStudentValidator = z.object({
    id: z.string().nonempty("Id field can't be blank"),
    name: z.string().nonempty("Name field can't be blank"),
    email: z.string().nonempty("Email field can't be blank").email("Not a valid email"),
    phone: z.string().nonempty("Phone field can't be blank").regex(new RegExp(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    ), 'Not a valid phone number'),
    college: z.string().nonempty("College field can't be blank"),
    status: z.enum(['placed', 'not placed'], {
        errorMap: () => ({ message: 'Invalid status value' })
    }),
});

export default editStudentValidator;