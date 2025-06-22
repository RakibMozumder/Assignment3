import { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode?: number;
}

export const sendResponse = <T>(
  res: Response,
  { success, message, data, statusCode = 200 }: IApiResponse<T>
): void => {
  res.status(statusCode).json({ success, message, data });
};
