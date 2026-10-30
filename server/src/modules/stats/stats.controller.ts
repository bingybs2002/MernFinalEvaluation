import { Request, Response, NextFunction } from 'express';
import * as statsService from './stats.service.js';
import { ValidationError } from '../../shared/errors.js';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await statsService.getStats();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getRecent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 🔴 TODO: Read the optional ?limit= query param (default 5). 
    // It must be a whole number from 1 to 10, otherwise throw a 
    // ValidationError (400). Pass it to the service.
    const count:number = Number(req.query.limit) || 5;

    //1 to 10
    if(count < 1 || count > 10){
      throw new ValidationError("Count must be within the range of 0-10");
    }
    const result = await statsService.getRecent(count);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
