export class Result {
    message: string;
    statusCode: number;
    payload?: any;
    constructor(message: string, statusCode: number, payload?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.payload = payload;
    }
}

