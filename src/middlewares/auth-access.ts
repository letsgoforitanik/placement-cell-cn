import { Request, Response, NextFunction } from "express";
import { authRedirects } from "@/config";

// This piece of middleware passes the request to the next middleware
// if at this point request is authenticated, otherwise redirects to
// 'failureRedirect' url
export function authorizedOnly(req: Request, res: Response, next: NextFunction) {
    const url = authRedirects.authorizedOnly.failureRedirect;
    if (!req.isAuthenticated()) return res.redirect(url);
    next();
}


// This piece of middleare passes the request to the next middleware 
// if at this point request is not authenticated, otherwise redirects to
// 'failureRedirect' url
export function anonymousOnly(req: Request, res: Response, next: NextFunction) {
    const url = authRedirects.anonymousOnly.failureRedirect;
    if (req.isAuthenticated()) return res.redirect(url);
    next();
}