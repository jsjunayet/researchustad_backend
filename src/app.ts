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
  try {
    const now = new Date();
    const nowUTC = new Date(now.toISOString()); 
    console.log('[DEBUG] Current UTC time:', nowUTC.toISOString());
    const upcomingCourses = await courseModel.find({ 
      status: "upcoming",
      startDate: { $lte: nowUTC }
    });
    console.log(`[DEBUG] Found ${upcomingCourses.length} courses to update`);
    
    for (const course of upcomingCourses) {
      console.log('[DEBUG] Course details:', {
        _id: course._id,
        storedStart: course.startDate.toISOString(),
        comparison: course.startDate.toISOString() <= nowUTC.toISOString()
      });

      course.status = "ongoing";
      await course.save();
      console.log(`[DEBUG] Updated course ${course._id} to ongoing`);
    }

    // 4. Emit updates (consider emitting only changed courses)
    io.emit("courseUpdate", await courseModel.find());
  } catch (error) {
    console.error('Error in updateCourseStatus:', error);
  }
};



setInterval(updateCourseStatus, 10 * 1000);

export default app;
