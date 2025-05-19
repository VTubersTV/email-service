import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Error:', { error: err.message, stack: err.stack });
    res.status(500).json({ error: 'Internal server error' });
}; 