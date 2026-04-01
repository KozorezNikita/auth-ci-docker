import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

type ValidateProps = {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
};

export function validate({ body, params, query }: ValidateProps) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 🔹 body
    if (body) {
      const result = body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json(result.error.format());
      }
      req.body = result.data;
    }

    // 🔹 params
    if (params) {
      const result = params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json(result.error.format());
      }
      (req as any).params = result.data;
    }

    // 🔹 query
    if (query) {
      const result = query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json(result.error.format());
      }
      (req as any).query = result.data;
    }

    next();
  };
}