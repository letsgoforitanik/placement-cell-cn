import { Request, Response, NextFunction } from "express";
import validators from "@/validators";
import { getRouteTemplate } from "@/helpers";

export default function validate(req: Request, res: Response, next: NextFunction) {

    const template = getRouteTemplate(req);

    const validator = validators[template];
    const result = validator.safeParse(req.body);

    if (result.success === false) {
        const errors = result.error.errors.map(({ path, message }) => ({ path: path[0]?.toString(), message }));
        req.setFlashErrors(errors);
        return res.redirect('back');
    }

    req.validationResult = result.data;
    next();

}