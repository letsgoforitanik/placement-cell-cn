import { z } from "zod";
import moment from "moment";

function preprocess(body: any) {
    const { id, company, date } = body;
    return { id, company, date: moment(date, 'DD/MM/YYYY').toDate() };
}

const editInterviewValidator = z.preprocess(preprocess, z.object({
    id: z.string().nonempty("Id field can't be blank"),
    company: z.string().nonempty("Company name field can't be blank"),
    date: z.date().min(new Date(), "Date must be grater than today's date")
}));

export default editInterviewValidator;