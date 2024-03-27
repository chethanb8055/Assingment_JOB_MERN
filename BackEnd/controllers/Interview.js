// import ErrorHandler from "../middlewares/errorHandler.js";
// import { Interview } from "../models/InterviewSchema"; // Correct the import statement
// import { asyncHandler } from "../utils/asyncHandler.js"; // Correct the import statement

// // Controller for scheduling an interview
// export const scheduleInterview = asyncHandler(async (req, res, next) => {
//   const { date, time, location, employerID, interviewType, meetingLink } =
//     req.body;

//   const applicationID = req.params.id; // Use req.params.id to get the application ID from the URL parameter

//   // Check if the application exists
//   const application = await Interview.findById(applicationID); // Assuming Application is the name of the model
//   if (!application) {
//     return next(new ErrorHandler("Application not found", 404));
//   }

//   try {
//     // Create the interview document
//     const interview = await Interview.create({
//       date,
//       time,
//       location,
//       applicationID,
//       employerID,
//       interviewType,
//       meetingLink,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Interview scheduled successfully",
//       interview,
//     });
//   } catch (error) {
//     return next(new ErrorHandler("Failed to schedule interview", 500));
//   }
// });
