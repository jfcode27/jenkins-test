import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';

import asyncHandler from '@middlewares/async'
import ErrorResponse from '@utils/errorResponse'
import { UserRole } from '@common/enums/userRole';
import { StatusCodes } from '@common/enums/enums';
export interface TokenPayload extends JwtPayload {
    id: string,
    role: UserRole,
}

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) throw new ErrorResponse('No se encontro token', StatusCodes.UNAUTHORIZED)

    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_PASSWORD!)
    } catch (err) {
        throw new ErrorResponse('Token invalido', StatusCodes.UNAUTHORIZED)
    }

    if (!decodedToken) throw new ErrorResponse("Token invalido", StatusCodes.UNAUTHORIZED)

    const { id, role } = decodedToken as TokenPayload

    req.user = { id, role }

   next()
});

export const authorizer = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user!.role)) {
            throw new ErrorResponse("No Autorizado", StatusCodes.UNAUTHORIZED);
        }
        next();
    }
}