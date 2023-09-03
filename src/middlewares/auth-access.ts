import { Request, Response, NextFunction } from "express";
import { authRedirects } from "@/config";


export function authorizedOnly(req: Request, res: Response, next: NextFunction) {
    const url = authRedirects.authorizedOnly.failureRedirect;
    if (!req.isAuthenticated()) return res.redirect(url);
    next();
}

export function anonymousOnly(req: Request, res: Response, next: NextFunction) {
    const url = authRedirects.anonymousOnly.failureRedirect;
    if (req.isAuthenticated()) return res.redirect(url);
    next();
}