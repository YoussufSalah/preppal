# API Integration Fixes - Frontend

## Overview

This document outlines the fixes made to the frontend API integration to work with the deployed Railway backend.

## Key Fixes Applied

### 1. API Base URL Configuration

-   **Fixed**: Updated default API base URL to use the deployed Railway instance
-   **Location**: `src/utils/APIService.js`
-   **Change**:

    ```javascript
    // Before
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    // After
    process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://ai-study-companion-api-production.up.railway.app";
    ```

### 2. FormData Handling

-   **Fixed**: Proper FormData handling for file uploads
-   **Location**: `src/utils/APIService.js`
-   **Change**: Added proper Content-Type header management for FormData vs JSON requests

### 3. Missing Import Fix

-   **Fixed**: Removed unused `createClientComponentClient` import
-   **Location**: `src/app/upload/page.js`
-   **Change**: Removed the line `const supabase = createClientComponentClient();`

### 4. User Data Structure Handling

-   **Fixed**: Updated user data access to handle API response format
-   **Location**: `src/app/dashboard/page.js`
-   **Change**: Added fallback for username field:
    ```javascript
    user.username ||
        user.user_metadata?.username ||
        user.email?.split("@")[0] ||
        "User";
    ```

### 5. Token Management

-   **Fixed**: Improved token handling in authentication flow
-   **Location**: `src/utils/auth.js`
-   **Change**: Added proper session token extraction and storage

## API Endpoints Structure

The backend API is structured as follows:

```
Base URL: https://ai-study-companion-api-production.up.railway.app

Endpoints:
├── /api/auth/
│   ├── POST /register - User registration
│   ├── POST /login - User login
│   ├── POST /google - Google OAuth
│   └── GET /callback - OAuth callback
├── /api/user/
│   ├── GET /me/ - Get current user
│   ├── PATCH /me/ - Update current user
│   ├── DELETE /me/ - Delete current user
│   └── /tokens/ - Token management
├── /api/upload/
│   ├── POST /pdf - Upload PDF file
│   └── POST /youtube - Add YouTube URL
├── /api/summarize/
│   ├── GET /pdf/{id} - Generate PDF summary
│   ├── GET /youtube/{id} - Generate YouTube summary
│   └── GET / - Get all summaries
├── /api/flashcards/
│   ├── GET /pdf/{id} - Generate PDF flashcards
│   ├── GET /youtube/{id} - Generate YouTube flashcards
│   └── GET / - Get all flashcards
└── /api/admin/ - Admin routes (protected)
```

## Authentication Flow

1. **Registration**: User registers with email, password, and username
2. **Login**: User logs in and receives a Supabase access token
3. **Token Storage**: Token is stored in localStorage as "accessToken"
4. **API Calls**: All subsequent API calls include the token in Authorization header
5. **Token Validation**: Backend validates tokens using Supabase auth

## File Upload Process

1. **PDF Upload**:
    - File is uploaded via FormData to `/api/upload/pdf`
    - Returns upload ID for further processing
2. **Summary Generation**:
    - Call `/api/summarize/pdf/{uploadId}` to generate summary
    - Returns summary URL for download
3. **Flashcard Generation**:
    - Call `/api/flashcards/pdf/{uploadId}` to generate flashcards
    - Returns flashcards URL for download

## Testing the Integration

### 1. Environment Check

Visit `/env-check` to verify environment variables are set correctly.

### 2. API Test

Visit `/api-test` to run comprehensive API connectivity tests.

### 3. Authentication Test

Visit `/test-auth` to test the authentication flow.

## Common Issues and Solutions

### Issue: "Cannot connect to backend server"

**Solution**: Verify the API base URL is correct and the Railway deployment is running.

### Issue: "Invalid or expired token"

**Solution**: User needs to log in again. The token may have expired.

### Issue: "File upload failed"

**Solution**:

-   Check file size (max 50MB)
-   Ensure file is PDF format
-   Verify user has sufficient tokens

### Issue: "User not found in local DB"

**Solution**: This indicates a mismatch between Supabase auth and local database. Contact admin.

## Environment Variables

Required environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://ai-study-companion-api-production.up.railway.app

# Supabase Configuration (for frontend auth if needed)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development vs Production

-   **Development**: Can override API base URL with environment variable
-   **Production**: Uses Railway deployment by default
-   **Local Testing**: Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000` for local backend

## Security Notes

-   All API endpoints (except auth) require valid Supabase access tokens
-   Tokens are automatically included in requests via Authorization header
-   File uploads are restricted to PDF format and 50MB size limit
-   User data is validated on both frontend and backend

## Next Steps

1. Test the complete user flow: registration → login → upload → generate → download
2. Monitor API response times and error rates
3. Implement proper error handling for edge cases
4. Add loading states and user feedback
5. Consider implementing retry logic for failed requests
