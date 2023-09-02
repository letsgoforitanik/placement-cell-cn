import { Request, Response, NextFunction } from "express";
import validators from "@/validators";

export default function validate(req: Request, res: Response, next: NextFunction) {
    const validator = validators[req.originalUrl];
    const result = validator.safeParse(req.body);

    if (result.success === false) {
        const errors = result.error.errors.map(({ path, message }) => ({ path: path[0]?.toString(), message }));
        req.flash('last-request-body', JSON.stringify(req.body));
        req.setFlashErrors(errors);
        return res.redirect('back');
    }

    req.validationResult = result.data;
    next();

}