import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/datbase.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { BadRequestException } from "./utils/appError";
import { ErrorCodeEnum } from "./enums/error-code.enum";

import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Correct express-session configuration
app.use(
  session({
    secret: config.SESSION_SECRET, // ✅ use "secret" (not "keys")
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: config.NODE_ENV === "production", // use HTTPS in production
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// ✅ Initialize passport AFTER session
app.use(passport.initialize());
app.use(passport.session());

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
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);

// ✅ Error handler
app.use(errorHandler);

// ✅ Start server
app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
