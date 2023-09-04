import { z } from "zod";
import moment from "moment";

function preprocess(body: any) {
    const { company, date } = body;
    return { company, date: moment(date, 'DD/MM/YYYY').toDate() };
}

const addInterviewValidator = z.preprocess(preprocess, z.object({
    company: z.string().nonempty("Company name field can't be blank"),
    date: z.date().min(new Date(), "Date must be grater than today's date")
}));

export default addInterviewValidator;