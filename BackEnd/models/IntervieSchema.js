// const interviewSchema = new mongoose.Schema({
//   // Define interview fields
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   applicationID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Application", // Assuming Application is the name of your application model
//     required: true,
//   },
//   employerID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Assuming User is the name of your user model
//     required: true,
//   },
//   interviewType: {
//     type: String,
//     enum: ["Phone", "Video", "In-person"], // Assuming these are the interview types
//     required: true,
//   },
//   meetingLink: {
//     type: String,
//     default: "", // Default value is an empty string
//   },
// });

// export const Interview = mongoose.model("Interview", interviewSchema);
