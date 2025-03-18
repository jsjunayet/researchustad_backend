
import cookieParser from 'cookie-parser';
import cron from "node-cron";
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import * as http from "http";
import { io } from './app/utils/socket';
import { courseModel } from './app/modules/Course/Course.model';
import { eventModel } from './app/modules/Event/event.model';
import { updateStatus } from './app/utils/RealtimeUpdate';

const app: Application = express();
const server = http.createServer(app);

io.attach(server, {
  cors: {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});
app.use(express.json());
app.use(cookieParser());


// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hi Researchustad website !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);
cron.schedule("*/1 * * * *", () => {
  updateStatus(courseModel, "status", "startDate"); // Course model as usual
  updateStatus(eventModel, "status", "startDate", "eventDuration"); // Event model with duration
});
export default app;
