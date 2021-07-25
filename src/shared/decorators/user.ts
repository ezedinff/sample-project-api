import { createParamDecorator } from '@nestjs/common';
import { Request } from "express";
export const CurrentUser = createParamDecorator(
  (data: unknown, req: Request) => {
    return req.user;
  },
);