import express, { Request, Response } from "express";
import moment from "moment";
import { authorizedOnly, validate } from "@/middlewares";
import { interviewService } from "@/services";
import { InterviewAddInfo, InterviewEditInfo } from "@/types/validation-result";

const router = express.Router();
const interviewRouter = express.Router();

router.use("/interviews", authorizedOnly, interviewRouter);

// routes

interviewRouter.get('/', getInterviewsPage);
interviewRouter.get('/add', getAddInterviewPage);
interviewRouter.post('/add', validate, addInterview);
interviewRouter.get('/:id/edit', getEditInterviewPage);
interviewRouter.post('/:id/edit', validate, updateInterviewDetails);


// route handlers

async function getInterviewsPage(req: Request, res: Response) {

    const result = await interviewService.getInterviews();

    const interviews = result.data.map(interview => (
        {
            id: interview.id,
            company: interview.company,
            date: moment(interview.date).format("dddd, DD/MM/YYYY")
        }
    ));

    return res.render('interview/index', { interviews });

}


async function getAddInterviewPage(req: Request, res: Response) {
    return res.render('interview/add');
}


async function addInterview(req: Request, res: Response) {
    const info = req.validationResult as InterviewAddInfo;
    await interviewService.addInterview(info);
    req.setFlashMessage('Interview added successfully');
    return res.redirect('/interviews');
}


async function getEditInterviewPage(req: Request, res: Response) {
    const id = req.params.id;
    const result = await interviewService.getInterview(id);
    const interview = result.data!;

    return res.render('interview/edit', {
        interview: {
            id: interview.id,
            company: interview.company,
            date: moment(interview.date).format('DD/MM/YYYY')
        }
    });

}


async function updateInterviewDetails(req: Request, res: Response) {
    const info = req.validationResult as InterviewEditInfo;
    await interviewService.updateInterview(info);
    req.setFlashMessage('Interview updated successfully');
    return res.redirect('/interviews');
}


export { router };