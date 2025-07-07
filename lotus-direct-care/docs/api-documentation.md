# API Documentation

## Lead Management API

### Submit Lead
**Endpoint:** `POST /api/leads`  
**Description:** Submit a new lead from the contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "message": "I'm interested in your services"
}
```

**Response (201 Created):**
```json
{
  "message": "Lead submitted successfully",
  "id": "uuid-here"
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Server error

---

### Admin API

#### Authentication
All admin endpoints require authentication using Bearer token in the Authorization header:

```
Authorization: Bearer your-admin-api-key
```

Generate your API key securely:
```bash
openssl rand -base64 32
```

#### Get Leads
**Endpoint:** `GET /api/admin/leads`  
**Description:** Retrieve leads with filtering and pagination

**Query Parameters:**
- `status` (optional): Filter by status (new, contacted, converted, archived)
- `limit` (optional): Number of results per page (default: 50)
- `offset` (optional): Number of results to skip (default: 0)
- `orderBy` (optional): Sort field (created_at, name, email)
- `order` (optional): Sort direction (asc, desc)

**Example Request:**
```
GET /api/admin/leads?status=new&limit=20&orderBy=created_at&order=desc
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-0123",
      "message": "I'm interested in your services",
      "created_at": "2025-01-06T12:00:00Z",
      "source": "website",
      "status": "new"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

#### Update Lead Status
**Endpoint:** `PATCH /api/admin/leads`  
**Description:** Update the status of a lead

**Request Body:**
```json
{
  "id": "uuid-here",
  "status": "contacted"
}
```

**Response (200 OK):**
```json
{
  "message": "Lead updated successfully",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "contacted"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid or missing API key
- `404 Not Found` - Lead not found
- `400 Bad Request` - Invalid request data
- `500 Internal Server Error` - Server error

## Environment Variables

Required environment variables for the API:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Admin API Authentication
ADMIN_API_KEY=your-secure-admin-api-key

# Email Notifications (optional)
NOTIFICATION_EMAIL=admin@example.com
```

## Database Schema

See `/docs/database-schema.sql` for the complete database schema including:
- Table structure
- Indexes
- Row Level Security policies
- Views for statistics

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "message": "Human-readable error message",
  "errors": [  // Optional, for validation errors
    {
      "path": ["field_name"],
      "message": "Specific error for this field"
    }
  ]
}
```

## Logging

The API uses a structured logging system that:
- Logs all successful operations with relevant context
- Logs all errors with stack traces (in development)
- Provides correlation for debugging
- Can be extended to send logs to external services

In production, consider integrating with services like:
- Sentry for error tracking
- Datadog for metrics and logs
- LogRocket for session replay