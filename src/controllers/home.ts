import express, { Request, Response } from "express";

const router = express.Router();

// routes

router.get('/', (req, res) => res.redirect('/sign-in'));
router.get('/sign-in', getSignInPage);
router.get('/sign-up', getSignUpPage);


// route handlers

function getIndexPage(req: Request, res: Response) {
    return res.render('home/index');
}

function getSignInPage(req: Request, res: Response) {
    return res.render('home/sign-in');
}


function getSignUpPage(req: Request, res: Response) {
    return res.render('home/sign-up');
}


export { router }
