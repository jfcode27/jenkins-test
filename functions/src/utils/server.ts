import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { logger } from 'firebase-functions/v2';
import morgan from 'morgan';
import errorHandler from '@middlewares/error';
import ErrorResponse from './errorResponse';
import { StatusCodes } from '@common/enums/enums';

export class Server {
    public app: Application;

    constructor(router: express.Router) {
        this.app = express();
        this.config();
        this.routes(router);
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors(
            {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization']
            }
        ));

        morgan.token('body', (req: express.Request) => {
            logger.info(`[${req.method}] ${req.url} ${req.statusCode}`);
            return JSON.stringify(req.body);
        });

        this.app.use(morgan('dev'));
    }

    private routes(apiRouter: express.Router): void {
        this.app.use('/', apiRouter);
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next(
                new ErrorResponse(`Página no encontrada - ${req.originalUrl}`, StatusCodes.NOT_FOUND)
            )
        });
        this.app.use(errorHandler);
    }
}

