import { Request, Response, NextFunction } from 'express';

export default function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
    console.log(error);
    return response.status(500).redirect('/internal-server-error');
}