import express, { NextFunction, Request, Response } from "express";
import { SignUpInfo } from "@/types/validation-result";
import { anonymousOnly, authorizedOnly, validate } from "@/middlewares";
import { employeeService } from "@/services";
import { passport } from "@/config";

const router = express.Router();

// routes

// anonymousOnly -> middleware makes sure that requests
// only pass if they are not authenticated
// authorizedOnly -> middleware makes sure that requests
// only pass if they are authenticated

router.get('/', (req, res) => res.redirect('/students'));
router.get('/sign-in', anonymousOnly, getSignInPage);
router.post('/sign-in', anonymousOnly, signInUser);
router.get('/sign-up', anonymousOnly, getSignUpPage);
router.post('/sign-up', anonymousOnly, validate, signUpUser);
router.get('/sign-out', authorizedOnly, signOutUser);


// route handlers


function getSignInPage(req: Request, res: Response) {
    return res.render('home/sign-in');
}


function getSignUpPage(req: Request, res: Response) {
    return res.render('home/sign-up');
}


async function signUpUser(req: Request, res: Response) {

    const info = req.validationResult as SignUpInfo;

    const result = await employeeService.addEmployee(info);

    if (!result.success) {
        req.setFlashErrors(result.errors);
        return res.redirect('back');
    }

    req.setFlashMessage('Registration successful');
    return res.redirect('/sign-in');

}


async function signInUser(req: Request, res: Response, next: NextFunction) {

    function authCallback(errors: AppError[], user: any) {

        if (!user) {
            req.setFlashErrors(errors);
            return res.redirect('back');
        }

        function loginCallback(error: any) {
            if (error) return next(error);
            req.setFlashMessage('Signed in successfully');
            return res.redirect('/students');
        }

        req.login(user, loginCallback);

    }

    const handler = passport.authenticate('local', authCallback);

    handler(req, res, next);

}


function signOutUser(req: Request, res: Response) {
    return req.logout(() => {
        req.setFlashMessage('Signed out successfully');
        return res.redirect('/sign-in');
    });
}



export { router }; 
