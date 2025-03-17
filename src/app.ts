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
import axios from "axios";

const app: Application = express();
const server = http.createServer(app);
const EMAIL_LIST_VERIFY_API_KEY = 'UMrmnlZjJkEU1zclYXFdg'; // Store API Key in .env

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

app.get("/verify-email", async (req: Request, res: Response) => {
  console.log("hello world");
    const email = req.query.email as string;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const response = await axios.get(
            `https://api.emaillistverify.com/api/verifyEmail`, {
                params: {
                    email,
                    apiKey: 'zlTB0EN1hQW80LPbZZZC3'
                }
            }
        );

        return res.json({
            email,
            status: response.data,
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to verify email" });
    }
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
setInterval(updateCourseStatus, 60000);
// const updateStatus = async (model: any, statusField: string, startDateField: string, endDateField?: string) => {
//   try {
//     const now = new Date();
//     const nowUTC = new Date(now.toISOString());
//     console.log(`[DEBUG] Checking status updates at ${nowUTC.toISOString()}`);

//     // ✅ ১. "upcoming" → "ongoing"
//     const upcomingItems = await model.find({
//       [statusField]: "upcoming",
//       [startDateField]: { $lte: nowUTC },
//       ...(endDateField ? { [endDateField]: { $gte: nowUTC } } : {}), // Optional endDate check
//     });

//     for (const item of upcomingItems) {
//       item[statusField] = "ongoing";
//       await item.save();
//       console.log(`[DEBUG] Updated ${model.modelName} ${item._id} to ongoing`);
//     }

//     // ✅ ২. "ongoing" → "finished" (শুধুমাত্র event এর জন্য প্রযোজ্য)
//     if (endDateField) {
//       const ongoingItems = await model.find({
//         [statusField]: "ongoing",
//         [endDateField]: { $lt: nowUTC },
//       });

//       for (const item of ongoingItems) {
//         item[statusField] = "finished";
//         await item.save();
//         console.log(`[DEBUG] Updated ${model.modelName} ${item._id} to finished`);
//       }
//     }

//     // ✅ ৩. Socket.io দিয়ে আপডেট পাঠানো
//     io.emit(`${model.modelName.toLowerCase()}Update`, await model.find());
//   } catch (error) {
//     console.error(`Error updating ${model.modelName} status:`, error);
//   }
// };

// ✅ ৪. একটি মাত্র `setInterval` ব্যবহার করে উভয় স্ট্যাটাস আপডেট করুন
// setInterval(() => {
//   updateStatus(courseModel, "status", "startDate"); // Course Update
//   updateStatus(eventModel, "status", "startDate", "endDate"); // Event Update
// }, 60000);


export default app;
