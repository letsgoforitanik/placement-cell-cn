import { Express, NextFunction, Request, Response, Router } from 'express';

// This method is a wrapper around trycatchifyrouter
export default function trycatchify(app: Express) {
    trycatchifyRouter(app._router);
}

// Purpose of this method is to recursively traverse 
// each router starting from app router. When it finds
// a request handler, it wraps the handler with a try
// catch block. the catch block sends the caught error to 
// error handling middleware. Because of this method, errors
// need not be caught inside request handlers. 
function trycatchifyRouter(router: Router) {

    const routerStack = router.stack;

    for (const layer of routerStack) {

        if (layer.name === 'router') {
            const router = layer.handle as Router;
            trycatchifyRouter(router);
        }

        if (layer.route && layer.route.path) {
            const route = layer.route;
            const routeStack = route.stack;
            const routeHandler = routeStack[routeStack.length - 1].handle;

            routeStack[routeStack.length - 1].handle = function (req: Request, res: Response, next: NextFunction) {
                Promise.resolve().then(() => routeHandler(req, res, next)).catch(error => next(error));
            };

        }

    }
}
