import { UserDocument } from "../models/user.model";
import "express-session";

declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
  }
}


declare module "express-session" {
  interface SessionData {
    passport: {
      user: string; // or the type of your user ID
    };
  }
}
