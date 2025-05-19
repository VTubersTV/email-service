/*
 * VTubers.TV Email Service
 * Copyright (c) 2025 VTubers.TV and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

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
            ...validatedData,
            from: `"${validatedData.from}" <${process.env.SMTP_USER}>`
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