import { Request } from 'express';
import { JwtPayload } from './jwt-payload';

export type RequestWithUser = Request & { user: JwtPayload };
