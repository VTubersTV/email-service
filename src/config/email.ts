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

import { createTransport } from "nodemailer";
import { z } from "zod";
import { logger } from "./logger";

export const envSchema = z.object({
    SMTP_HOST: z.string(),
    SMTP_PORT: z.string(),
    SMTP_SECURE: z.string(),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
    API_KEY: z.string()
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Create transporter with validated environment variables
export const transporter = createTransport({
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT),
    secure: env.SMTP_SECURE === 'true',
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    },
    debug: true,
    logger: true
});

// Verify the transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        logger.error('SMTP connection error:', error);
    } else {
        logger.info('SMTP server is ready to take our messages');
    }
}); 