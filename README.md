# Email Service

A robust email service for vtubers.tv that provides email sending capabilities with features like rate limiting, logging, and template support.

## Features

- Email sending with HTML and text support
- File attachments support
- Rate limiting to prevent abuse
- Comprehensive logging
- Input validation
- Health check endpoint
- Error handling
- Security features (CORS, Helmet)

## Prerequisites

- Node.js 18 or higher
- pnpm 10.10.0 or higher
- SMTP server credentials

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env` and fill in your SMTP credentials:
   ```bash
   cp .env.example .env
   ```

## Configuration

Edit the `.env` file with your SMTP server details:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
API_KEY=your-api-key # This is used to authenticate requests to the API so it is not abused
```

## Development

Run the development server:

```bash
pnpm dev
```

## Production

Build and start the production server:

```bash
pnpm build
pnpm start
```

## API Endpoints

### Send Email

```http
POST /api/email/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Hello",
  "text": "Plain text content",
  "html": "<p>HTML content</p>",
  "attachments": [
    {
      "filename": "test.txt",
      "content": "Hello World"
    }
  ]
}
```

### Health Check

```http
GET /health
```

## Error Handling

The service includes comprehensive error handling:

- Input validation errors (400)
- Rate limit exceeded (429)
- Server errors (500)

All errors are logged with stack traces for debugging.

## Logging

Logs are written to:
- `error.log` - Error level logs
- `combined.log` - All logs
- Console - Development logs with colors

## Security

- CORS enabled
- Helmet security headers
- Rate limiting
- Input validation
- Secure SMTP configuration

## License

See [LICENSES.md](LICENSES.md) for details.


