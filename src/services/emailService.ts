import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { transporter } from "../config/email";
import { emailSchema } from "../schemas/email";
import { logger } from "../config/logger";

export const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req.headers['x-api-key'];
        if (key !== process.env.API_KEY) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized'
            });
        }
        const validatedData = emailSchema.parse(req.body);
        
        const info = await transporter.sendMail({
            ...validatedData
        });

        logger.info('Email sent successfully', { messageId: info.messageId });
        res.json({ 
            success: true, 
            messageId: info.messageId,
            message: 'Email sent successfully'
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ 
                success: false, 
                error: 'Validation error', 
                details: error.errors 
            });
        }
        next(error);
    }
}; 