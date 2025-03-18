import { io } from "./socket";

export const updateStatus = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  statusField: string,
  startDateField: string,
  durationField?: string // Event duration field in minutes
) => {
  try {
    const now = new Date();
    console.log(`[CRON] Checking status updates at ${now.toISOString()}`);

    // ✅ Step 1: "upcoming" → "ongoing"
    const upcomingItems = await model.find({
      [statusField]: "upcoming",
      [startDateField]: { $lte: now }, // Start time reached
    });

    for (const item of upcomingItems) {
      item[statusField] = "ongoing";
      await item.save();
      console.log(`[CRON] Updated ${model.modelName} ${item._id} to ongoing`);
    }

    // ✅ Step 2: "ongoing" → "finished" (after event duration)
    if (durationField) {
      const ongoingItems = await model.find({ [statusField]: "ongoing" });

      for (const item of ongoingItems) {
        const startDate = new Date(item[startDateField]);
        const eventDuration = item[durationField]; // Duration in minutes

        const endTime = new Date(startDate.getTime() + eventDuration * 60 * 1000); 

        if (now >= endTime) {
          item[statusField] = "finished";
          await item.save();
          console.log(`[CRON] Updated ${model.modelName} ${item._id} to finished`);
        }
      }
    }

    io.emit(`${model.modelName.toLowerCase()}Update`, await model.find());
  } catch (error) {
    console.error(`Error updating ${model.modelName} status:`, error);
  }
};


  // const updateCourseStatus = async () => {
//   try {
//     const now = new Date();
//     const nowUTC = new Date(now.toISOString()); 
//     console.log('[DEBUG] Current UTC time:', nowUTC.toISOString());
//     const upcomingCourses = await courseModel.find({ 
//       status: "upcoming",
//       startDate: { $lte: nowUTC }
//     });
//     console.log(`[DEBUG] Found ${upcomingCourses.length} courses to update`);

//     for (const course of upcomingCourses) {
//       console.log('[DEBUG] Course details:', {
//         _id: course._id,
//         storedStart: course.startDate.toISOString(),
//         comparison: course.startDate.toISOString() <= nowUTC.toISOString()
//       });

//       course.status = "ongoing";
//       await course.save();
//       console.log(`[DEBUG] Updated course ${course._id} to ongoing`);
//     }

//     // 4. Emit updates (consider emitting only changed courses)
//     io.emit("courseUpdate", await courseModel.find());
//   } catch (error) {
//     console.error('Error in updateCourseStatus:', error);
//   }
// };
// setInterval(updateCourseStatus, 60000);
// const EMAIL_LIST_VERIFY_API_KEY = 'UMrmnlZjJkEU1zclYXFdg'; // Store API Key in .env
// app.get("/verify-email", async (req: Request, res: Response) => {
//   console.log("hello world");
//     const email = req.query.email as string;

//     if (!email) {
//         return res.status(400).json({ error: "Email is required" });
//     }

//     try {
//         const response = await axios.get(
//             `https://api.emaillistverify.com/api/verifyEmail`, {
//                 params: {
//                     email,
//                     apiKey: 'zlTB0EN1hQW80LPbZZZC3'
//                 }
//             }
//         );

//         return res.json({
//             email,
//             status: response.data,
//         });
//     } catch (error) {
//         return res.status(500).json({ error: "Failed to verify email" });
//     }
// });