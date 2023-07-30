import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/classes";

export default () => {
  function catchAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((err: Error) => next(err));
    };
  }

  function log(req: Request, res: Response, next: NextFunction) {
    const requestTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const { url, method } = req;
    console.log(`${method} ${url} ${requestTime}`);
    next();
  }

  function errorHandler(
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err.stack);
    res.status(err.status).json({
      message: err.message,
      errorStack: err.stack,
    });
    next();
  }

  return {
    catchAsync,
    log,
    errorHandler,
  };
};
