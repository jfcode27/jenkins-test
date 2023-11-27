import router from '@routes/app.routes';
import { Server } from '@utils/server';

const server = new Server(router);

export default server.app;

