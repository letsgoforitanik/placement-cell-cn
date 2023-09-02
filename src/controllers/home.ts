import express, { Request, Response } from "express";
import { SignUpInfo } from "@/types/validation-result";
import { validate } from "@/middlewares";
import { employeeService } from "@/services";

const router = express.Router();

// routes

router.get('/', (req, res) => res.redirect('/sign-in'));
router.get('/sign-in', getSigninPage);
router.get('/sign-up', getSignupPage);
router.post('/sign-up', validate, signupUser);


// route handlers

function getIndexPage(req: Request, res: Response) {
    return res.render('home/index');
}

function getSigninPage(req: Request, res: Response) {
    return res.render('home/sign-in');
}


function getSignupPage(req: Request, res: Response) {
    return res.render('home/sign-up');
}


async function signupUser(req: Request, res: Response) {

    const info = req.validationResult as SignUpInfo;

    const result = await employeeService.addEmployee(info);

    if (!result.success) {
        req.setFlashErrors(result.errors);
        return res.redirect('back');
    }

    req.setFlashMessage('Registration successful');
    return res.redirect('/sign-in');

}

export { router }
