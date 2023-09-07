import express, { Request, Response } from "express";
import { authorizedOnly, validate } from "@/middlewares";
import { CourseScoreEditInfo, StudentAddInfo } from "@/types/validation-result";
import { studentService } from "@/services";
import { StudentUpdateDto } from "@/types/dto";



const router = express.Router();
const studentRouter = express.Router();

// routes 

router.use("/students", authorizedOnly, studentRouter);

studentRouter.get('/', getStudentsPage);
studentRouter.get('/add', getAddStudentPage);
studentRouter.post('/add', validate, addStudent);
studentRouter.get('/:id/edit', getEditStudentPage);
studentRouter.post('/update', validate, updateStudent);
studentRouter.get('/:id/delete', deleteStudent);
studentRouter.get('/course-scores', getCourseScorePage);
studentRouter.get('/course-scores/:id/edit', getEditCourseScorePage);
studentRouter.post('/course-scores/update', validate, updateCourseScore);


// route handlers

async function getStudentsPage(req: Request, res: Response) {
    const result = await studentService.getStudents();

    return res.render('student/index', {
        students: result.data
    });
}


async function getAddStudentPage(req: Request, res: Response) {
    return res.render('student/add');
}


async function addStudent(req: Request, res: Response) {
    const info = req.validationResult as StudentAddInfo;
    const courseScores = { dsa: null, react: null, webd: null };
    const result = await studentService.addStudent({ ...info, courseScores });

    if (!result.success) {
        req.setFlashErrors(result.errors);
        return res.redirect('back');
    }

    req.setFlashMessage('Student added successfully');
    return res.redirect('/students');

}


async function getEditStudentPage(req: Request, res: Response) {
    const studentId = req.params.id;
    const result = await studentService.getStudent(studentId);

    const student = result.data;
    return res.render('student/edit', { student });

}


async function updateStudent(req: Request, res: Response) {
    const info = req.validationResult as StudentUpdateDto;
    await studentService.updateStudent(info);

    req.setFlashMessage('Student updated successfully');
    return res.redirect('/students');

}


async function deleteStudent(req: Request, res: Response) {
    const studentId = req.params.id;
    await studentService.deleteStudent(studentId);

    req.setFlashMessage('Student deleted successfully');
    return res.redirect('/students');

}


async function getCourseScorePage(req: Request, res: Response) {
    const result = await studentService.getStudentsCourseScores();
    const students = result.data;
    return res.render('student/course-scores', { students });
}


async function getEditCourseScorePage(req: Request, res: Response) {
    const studentId = req.params.id;
    const result = await studentService.getStudentCourseScore(studentId);

    return res.render('student/edit-course-score', {
        student: result.data
    });
}


async function updateCourseScore(req: Request, res: Response) {
    const id = req.params.id;
    const scores = req.validationResult as CourseScoreEditInfo;
    await studentService.updateCourseScore({ ...scores, id });
    return res.redirect('/students/course-scores');
}


export { router }