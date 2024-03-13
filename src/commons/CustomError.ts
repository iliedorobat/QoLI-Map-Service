export class CustomError extends Error {
    code = 500;

    constructor(message: string, code: number) {
        super(message);

        this.name = this.constructor.name;
        if (code) {
            this.code = code;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}
