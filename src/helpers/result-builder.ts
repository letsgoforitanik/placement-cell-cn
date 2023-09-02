export function success<T>(data: T): SuccessResult<T> {
    return {
        success: true,
        data
    }
}

export function error(error: AppError): ErrorResult;
export function error(errors: AppError[]): ErrorResult;
export function error(message: string): ErrorResult;

export function error(arg: any): ErrorResult {

    if (typeof arg === 'string') {
        return {
            success: false,
            errors: [{ path: '', message: arg }]
        }
    }

    if (Array.isArray(arg)) {
        return {
            success: false,
            errors: arg
        }
    }

    return {
        success: false,
        errors: [arg]
    }

}