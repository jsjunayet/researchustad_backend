/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import * as http from "http";
import { io } from './app/utils/socket';
import { courseModel } from './app/modules/Course/Course.model';

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
const updateCourseStatus = async () => {
  const now = new Date();
  const upcomingCourses = await courseModel.find({ status: "upcoming" });
  for (const course of upcomingCourses) {
    const courseStartDate = new Date(course.startDate);
        if (courseStartDate.getTime() <= now.getTime()) {
      course.status = "ongoing";
      await course.save();
    }
  }
  const updatedCourses = await courseModel.find();
  io.emit("courseUpdate", updatedCourses);
};

setInterval(updateCourseStatus, 10 * 1000);
export default app;
