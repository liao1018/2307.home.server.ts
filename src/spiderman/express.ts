import dayjs from "dayjs";
import { Request, Response, NextFunction } from "express"; // 優化：引入 express 的類型聲明

export default () => {
  const catchAsync = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ) => {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((err: Error) => next(err));
    };
  };

  const log = (req: Request, res: Response, next: NextFunction) => {
    const requestTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const { url, method } = req;
    console.log(`${method} ${url} ${requestTime}`);
    next();
  };

  const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      message: err.message,
      errorStack: err.stack,
    });
    next();
  };

  return {
    catchAsync,
    log,
    errorHandler,
  };
};
