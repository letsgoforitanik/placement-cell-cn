import { Express, NextFunction, Request, Response, Router } from 'express';


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


export default function trycatchify(app: Express) {
    trycatchifyRouter(app._router);
}