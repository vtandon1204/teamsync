import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
// import session from "express-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/datbase.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
// import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";

import "./config/passport.config";
// import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import { passportAuthenticateJWT } from "./config/passport.config";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1); // Required if you're behind a proxy or using HTTPS in production

// ✅ Correct express-session configuration
// app.use(
//   session({
//     secret: config.SESSION_SECRET, // ✅ use "secret" (not "keys")
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//       secure: config.NODE_ENV === "production", // use HTTPS in production
//       httpOnly: true,
//       sameSite: "lax",
//     },
//   })
// );

// ✅ Initialize passport AFTER session
// app.use(passport.initialize());
// app.use(passport.session());

// ✅ CORS
app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// ✅ Test route
app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a bad request", ErrorCodeEnum.AUTH_INVALID_TOKEN);
  })
);

// ✅ Auth routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, passportAuthenticateJWT, userRoutes);
app.use(`${BASE_PATH}/workspace`, passportAuthenticateJWT, workspaceRoutes);
app.use(`${BASE_PATH}/member`, passportAuthenticateJWT, memberRoutes);
app.use(`${BASE_PATH}/project`, passportAuthenticateJWT, projectRoutes);
app.use(`${BASE_PATH}/task`, passportAuthenticateJWT, taskRoutes);
// ✅ Error handler
app.use(errorHandler);

// ✅ Start server
app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
