import { Request } from "express";

// This method figures out the route template when called inside
// a request handler. It is useful to for finding out the appropriate
// validator. 
export default function getRouteTemplate(req: Request) {
    const pathParts = req.route.path.split('/').filter(Boolean);
    const urlParts = req.originalUrl.split('/').filter(Boolean);
    const newParts = [...urlParts.slice(0, urlParts.length - pathParts.length), ...pathParts];
    return '/' + newParts.join('/');
}