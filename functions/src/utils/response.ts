import { Response } from 'express';
import { StatusCodes } from '@common/enums/enums';

export default class ResponseHttp {

    public response:  Response;

    constructor(
        response: Response
    ) {
        this.response = response;
    }

    public send<T = any>(
        message: string, 
        data: T,
        code: number,
    ) : void {
         this.response
            .status(code)
            .json({
            message,
            code: code || StatusCodes.SERVER_ERROR, 
            data: {...data}
        })
    }
}

