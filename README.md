
Assingment_JOB_MERN
Prerequisites
Before running the application, ensure you have the following installed:

Node.js
Code editor
MongoDB
Web browser

Getting Started
Start the Frontend
Navigate to the frontend directory.
Run npm init to install required dependencies.
Execute npm run start to start the frontend on your local machine.
Start the Backend
Navigate to the backend directory.
Run npm init to install required dependencies.
Execute npm run start to start the backend on your local machine.

Frontend
Overview
Upon starting the frontend, you will encounter the login page. If not redirected, use the following URL in your browser: http://localhost:5173/login.

User Authentication
Users can log in with their role (employer or jobseeker), providing their name, password, phone number, etc. After logging in, users are directed to the respective dashboard based on their role.

Employer Dashboard
Applicant's Applications: Employers can view applicants' applications and manage them by accepting or rejecting them. The status of the application will be reflected to the applicant.
Job Details: Employers can view all available jobs, including their own job postings.
Post New Job: Employers can add new job postings, which will be displayed in the Job Details section.
View Your Jobs: Employers can see the jobs they have posted.
Jobseeker Dashboard
My Applications: Jobseekers can view the status of their job applications. Initially, the status will be pending. Upon acceptance or rejection by the employer, the status will be updated accordingly.
Job Details: Jobseekers can view all available jobs along with the posting date. They can apply for jobs and fill out application forms before submission.
My Application: Jobseekers can track the status of their applications.

Backend
Overview
The backend follows the MVC pattern for better organization and debugging.

Model
Defines schemas for job applications and users.
Controller
Utilizes controllers such as application controller, job controller, and user controller.
Router
Establishes routes with respective controllers using HTTPS methods for authorization.
Database
Connects to MongoDB for data storage.
Middleware
Utilizes authentication middleware and error handler for effective error handling.
Utilities
Contains reusable code such as API response formatting for minimizing code repetition and enhancing readability.
Implements JWT token for user authentication and asyncHandler for handling asynchronous operations.
Server
Configures the Cloudinary and listens on port 4000 for incoming requests.
Security
Implements bcrypt for password hashing and JWT for secure login and user authentication.
Uses cookies to store JWT token information in key-value pairs for secure authentication.
Utilizes MongoDB for secure data storage.

Feel free to explore additional features or enhancements beyond the basic requirements to align with the project's goals.
