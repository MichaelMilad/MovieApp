import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT as unknown as number,
  session_secret: process.env.SESSION_SECRET as string
};
