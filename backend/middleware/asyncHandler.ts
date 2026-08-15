import { NextFunction, Request, RequestHandler, Response } from 'express';

// Express 4 doesn't catch rejected promises from async route handlers — an unhandled
// rejection (e.g. a Mongoose validation error) crashes the whole process. This wrapper
// forwards any thrown/rejected error to next() so the global error handler can respond
// with a normal HTTP error instead of taking the entire API down.
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
