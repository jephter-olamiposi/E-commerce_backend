export interface UserPayload {
  userId: number;
  role: string;
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
