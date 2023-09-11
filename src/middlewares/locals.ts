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

// In this middleware we are setting few values to response.locals
// which are then accessed throught the application, specially from
// views and other helper functions.
export default function locals(req: Request, res: Response, next: NextFunction) {

    // viewBag is just a plain object. This is useful to pass data between views
    // specially from any view to layout views.
    res.locals.viewBag = {};

    res.locals.user = req.isAuthenticated() ? req.user : null;

    // this is the last request body retrieved by serializing from flash
    // useful to refill fields upon validation fails
    const lastRequestBody = req.flash('last-request-body');

    res.locals.lastRequestBody = lastRequestBody.length > 0 ? JSON.parse(lastRequestBody[0]) : null;

    // flash messages
    const flashMessages = req.flash('message');

    res.locals.message = flashMessages.length > 0 ? flashMessages[0] : null;

    // flash errors
    const flashStringErrors = req.flash('errors');
    const errors = parseFlashErrors(flashStringErrors);
    res.locals.errors = errors.length > 0 ? {} : null;

    for (const error of errors) res.locals.errors[error.path!] = error.message;

    next();

}