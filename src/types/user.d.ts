export interface UserPayload {
  userId: number;
  role: string;
  [key: string]: any; // For any additional fields you might add later
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
