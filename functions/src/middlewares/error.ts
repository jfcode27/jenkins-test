import { Request, Response } from 'express';
import { NextFunction } from "express-serve-static-core";
import ResponseHttp from "@utils/response";
import ErrorResponse from "@utils/errorResponse";
import { logger } from 'firebase-functions/v2';

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {

    const response = new ResponseHttp(res);
    logger.error(err.message || "Error en el servidor", { structuredData: true });
    response.send(err.message || "Error en el servidor", {}, err.code || 500);

}

export default errorHandler;


