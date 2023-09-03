import { Request, Response, NextFunction } from 'express';


function parseFlashErrors(errors: string[]) {

    const flashErrors: AppError[] = [];

    for (const error of errors) {
        const delimIndex = error.indexOf("|");
        const path = error.substring(0, delimIndex);
        const message = error.substring(delimIndex + 1);
        flashErrors.push({ path, message });
    }

    return flashErrors;

}


export default function locals(req: Request, res: Response, next: NextFunction) {

    res.locals.viewBag = {};

    res.locals.user = req.isAuthenticated() ? req.user : null;

    const lastRequestBody = req.flash('last-request-body');
    res.locals.lastRequestBody = lastRequestBody.length > 0 ? JSON.parse(lastRequestBody[0]) : null;

    const flashMessages = req.flash('message');

    res.locals.message = flashMessages.length > 0 ? flashMessages[0] : null;

    const flashStringErrors = req.flash('errors');
    const errors = parseFlashErrors(flashStringErrors);
    res.locals.errors = errors.length > 0 ? {} : null;

    for (const error of errors) res.locals.errors[error.path!] = error.message;

    next();

}