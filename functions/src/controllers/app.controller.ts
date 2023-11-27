import { Request, Response } from "express";
import asyncHandler from "@middlewares/async";
import ResponseHttp from "@utils/response";
import { StatusCodes } from "@common/enums/enums";

export const helloWorld = asyncHandler(async (req: Request, res: Response) => {
        const response = new ResponseHttp(res);
        response.send("Hello World", {}, StatusCodes.OK);
});