import { HydratedDocument } from "mongoose";
import express, { Request, Response } from "express";
import moment from "moment";

import { authorizedOnly, validate } from "@/middlewares";
import { interviewService } from "@/services";
import { InterviewAddInfo, InterviewEditInfo, InterviewStatusEditInfo } from "@/types/validation-result";
import { IInterview, IStudent } from "@/types/model";

const router = express.Router();
const interviewRouter = express.Router();

router.use("/interviews", authorizedOnly, interviewRouter);

// routes

interviewRouter.get('/', getInterviewsPage);
interviewRouter.get('/add', getAddInterviewPage);
interviewRouter.post('/add', validate, addInterview);
interviewRouter.get('/:id/edit', getEditInterviewPage);
interviewRouter.post('/update', validate, updateInterviewDetails);
interviewRouter.get('/:id/delete', deleteInterview);
interviewRouter.get('/:id/students', getInterviewStudentListPage);
interviewRouter.get('/:id/add-student', getAddStudentPage);
interviewRouter.post('/:id/add-student', addStudentToInterview);
interviewRouter.get('/:interviewId/delete-student/:studentId', deleteStudentFromInterview);
interviewRouter.get('/:interviewId/edit-status/:studentId', getEditInterviewStatusPage);
interviewRouter.post('/update-status', validate, updateInterviewStatus);


// route handlers

async function getInterviewsPage(req: Request, res: Response) {
    const result = await interviewService.getInterviews();

    const interviews = result.data.map(i => ({
        id: i.id,
        company: i.company,
        date: moment(i.date).format("dddd, DD/MM/YYYY")
    }));

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


async function deleteInterview(req: Request, res: Response) {
    const interviewId = req.params.id;
    await interviewService.deleteInterview(interviewId);
    req.setFlashMessage('Interview deleted successfully');
    return res.redirect('/interviews');
}


async function getInterviewStudentListPage(req: Request, res: Response) {
    const interviewId = req.params.id;
    const result = await interviewService.getInterviewInDetails(interviewId);

    const interview = result.data!.interview!;
    const statusDetails = result.data!.studentsStatus!;


    return res.render('interview/student-list', {
        interview: {
            id: interview!.id,
            company: interview!.company,
            date: moment(interview!.date).format('dddd, DD/MM/YYYY')
        },
        students: statusDetails.map((details: any) => ({
            id: details.student.id,
            name: details.student.name,
            email: details.student.email,
            status: details.result
        }))
    });
}


async function getAddStudentPage(req: Request, res: Response) {

    const { id: interviewId } = req.params;
    const result = await interviewService.findUnallocatedStudents(interviewId);

    const { interview, students } = result.data;

    const newInterview = {
        date: moment(interview!.date).format('dddd DD/MM/YYYY'),
        id: interview!.id,
        company: interview!.company,
    };

    return res.render('interview/add-student', {
        interview: newInterview,
        students
    });

}


async function addStudentToInterview(req: Request, res: Response) {
    const { interviewId, studentId } = req.body;
    await interviewService.addStudentToInterview(interviewId, studentId);
    req.setFlashMessage("Student allocated to interview successfully");
    return res.redirect(`/interviews/${interviewId}/students`);
}


async function deleteStudentFromInterview(req: Request, res: Response) {
    const { interviewId, studentId } = req.params;
    await interviewService.deleteStudentFromInterview(interviewId, studentId);
    req.setFlashMessage("Student deallocated from interview successfully");
    return res.redirect(`/interviews/${interviewId}/students`);
}


async function getEditInterviewStatusPage(req: Request, res: Response) {

    const { interviewId, studentId } = req.params;
    const result = await interviewService.getStudentStatus(interviewId, studentId);

    const status = result.data!;

    const interview = status.interview as HydratedDocument<IInterview>;
    const student = status.student as HydratedDocument<IStudent>;

    return res.render('interview/edit-student', {
        status: {
            interview: {
                id: interview.id,
                date: moment(interview!.date).format('dddd DD/MM/YYYY'),
                company: interview!.company,
            },
            student,
            result: status.result
        }
    });

}


async function updateInterviewStatus(req: Request, res: Response) {
    const info = req.validationResult as InterviewStatusEditInfo;
    await interviewService.updateStudentStatus(info.interviewId, info.studentId, info.status);

    req.setFlashMessage('Student interview status updated successfully');
    return res.redirect(`/interviews/${info.interviewId}/students`);
}


export { router };