import { Request, Response, NextFunction } from "express";
import validators from "@/validators";

// Global validation middleware

// purpose of this middleware is to intercept request and validate
// for validation it passes the request body to appropriate validator
// if validation passes, it sets validation result to 'validationResult' object
// and calls next piece of middleware, upon validation failure, it sets the errors
// in flash and redirects the request to where it came from.
export default function validate(req: Request, res: Response, next: NextFunction) {

    const validator = validators[req.originalUrl];
    const result = validator.safeParse(req.body);

    if (result.success === false) {
        const errors = result.error.errors.map(({ path, message }) => ({ path: path[0]?.toString(), message }));
        req.setFlashErrors(errors);
        return res.redirect('back');
    }

    req.validationResult = result.data;
    next();

}