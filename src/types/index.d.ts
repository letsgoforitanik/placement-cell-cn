type AppError = { path?: string, message: string };

type SuccessResult<T> = { success: true; data: T; }

type ErrorResult = { success: false; errors: AppError[]; }

type Result<T> = SuccessResult<T> | ErrorResult;


declare namespace Express {
    export interface Request {
        validationResult: any;
        setFlashErrors(errors: AppError[]): void;
        setFlashErrors(message: string): void;
        setFlashMessage(message: string): void;
    }
}