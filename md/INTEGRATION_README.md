# Toppify Frontend API Integration

This document outlines the complete refactoring of the Toppify frontend to integrate with the backend API.

## 🚀 Overview

The frontend has been completely refactored to work with the backend API instead of Supabase for authentication and data management. The integration follows the API documentation provided and implements all necessary endpoints.

## 📁 Key Changes

### 1. API Service (`APIService.js`)

-   **Complete rewrite** of the API service to match backend endpoints
-   **All authentication methods** (login, register, getCurrentUser)
-   **Token management** (getUserTokens, useTokens, addTokens)
-   **Upload functionality** (uploadPDF, uploadYouTube)
-   **Content generation** (summaries, flashcards)
-   **Proper error handling** and connection management

### 2. Authentication System (`src/utils/auth.js`)

-   **Replaced Supabase** with backend API authentication
-   **Token-based authentication** using localStorage
-   **User session management**
-   **Token validation** and automatic cleanup

### 3. Login Page (`src/app/login/page.js`)

-   **Updated to use new auth system**
-   **Proper error handling** for API responses
-   **Token storage** and session management
-   **Redirect handling** after authentication

### 4. Upload Page (`src/app/upload/page.js`)

-   **Integrated with API service** for file uploads
-   **Real-time processing** with proper error handling
-   **Token validation** before operations
-   **Progress tracking** for uploads and generation

### 5. Dashboard (`src/app/dashboard/page.js`)

-   **Real user data** from API
-   **Token display** and management
-   **Summary and flashcard counts** from backend
-   **Sign out functionality**

### 6. Protected Routes (`src/app/components/ProtectedRoute.js`)

-   **Token validation** on route access
-   **Automatic redirect** to login if unauthorized
-   **Loading states** during authentication checks

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://ai-study-companion-api-production.up.railway.app

# Supabase Configuration (if still needed for any remaining features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🛠️ Installation & Setup

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Set up environment variables** (see above)

3. **Run the development server:**

    ```bash
    npm run dev
    ```

4. **Build for production:**
    ```bash
    npm run build
    npm start
    ```

## 🔐 Authentication Flow

### Registration

1. User fills registration form
2. Frontend calls `/auth/register` endpoint
3. Backend creates user account
4. User receives confirmation message

### Login

1. User enters credentials
2. Frontend calls `/auth/login` endpoint
3. Backend validates credentials
4. Access token stored in localStorage
5. User redirected to dashboard/upload

### Token Management

-   **Automatic token validation** on protected routes
-   **Token refresh** handled by backend
-   **Automatic logout** on token expiration

## 📤 File Upload & Processing

### PDF Upload

1. **File validation** (PDF format, size limits)
2. **Upload to backend** via `/upload/pdf`
3. **Get upload ID** for processing
4. **Generate content** (summaries, flashcards)
5. **Display results** with download links

### Content Generation

-   **Summaries**: `/summarize/pdf/{upload_id}`
-   **Flashcards**: `/flashcards/pdf/{upload_id}`
-   **Token deduction** before processing
-   **Progress tracking** during generation

## 🎯 API Endpoints Used

### Authentication

-   `POST /auth/register` - User registration
-   `POST /auth/login` - User login
-   `GET /user/me/` - Get current user

### Token Management

-   `GET /user/tokens/` - Get user tokens
-   `PATCH /user/tokens/use` - Use tokens
-   `PATCH /user/tokens/add` - Add tokens

### Upload

-   `POST /upload/pdf` - Upload PDF file
-   `POST /upload/youtube` - Upload YouTube URL

### Content Generation

-   `GET /summarize/pdf/{upload_id}` - Generate PDF summary
-   `GET /flashcards/pdf/{upload_id}` - Generate PDF flashcards
-   `GET /summarize/` - Get all summaries
-   `GET /flashcards/` - Get all flashcards

## 🚨 Error Handling

### Network Errors

-   **Connection failures** - User-friendly error messages
-   **API timeouts** - Automatic retry logic
-   **Server errors** - Graceful degradation

### Authentication Errors

-   **Invalid tokens** - Automatic logout
-   **Expired sessions** - Redirect to login
-   **Permission denied** - Clear error messages

### File Processing Errors

-   **Upload failures** - Retry options
-   **Processing errors** - Detailed error messages
-   **Token insufficiency** - Clear token requirements

## 🔄 State Management

### User State

-   **Authentication status** - Stored in localStorage
-   **User data** - Fetched from API
-   **Token balance** - Real-time updates

### Upload State

-   **File selection** - Local state
-   **Upload progress** - Real-time updates
-   **Processing status** - Step-by-step tracking

## 🎨 UI/UX Improvements

### Loading States

-   **Skeleton loaders** for data fetching
-   **Progress indicators** for uploads
-   **Spinner animations** for processing

### Error States

-   **Toast notifications** for errors
-   **Inline error messages** for forms
-   **Retry buttons** for failed operations

### Success States

-   **Success messages** for completed operations
-   **Download links** for generated content
-   **Confirmation dialogs** for important actions

## 🧪 Testing

### Manual Testing Checklist

-   [ ] User registration
-   [ ] User login/logout
-   [ ] PDF upload
-   [ ] Summary generation
-   [ ] Flashcard generation
-   [ ] Token management
-   [ ] Error handling
-   [ ] Protected routes

### API Testing

-   [ ] All endpoints respond correctly
-   [ ] Error responses handled properly
-   [ ] Token validation works
-   [ ] File upload limits respected

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Ensure all environment variables are set in production:

-   `NEXT_PUBLIC_API_BASE_URL`
-   Any remaining Supabase variables

### CORS Configuration

The backend should allow requests from your frontend domain.

## 📝 Notes

### Known Limitations

-   **Quiz generation** not yet implemented in API
-   **YouTube processing** requires English captions
-   **File size limits** enforced by backend

### Future Enhancements

-   **Real-time processing** updates
-   **Batch file processing**
-   **Advanced error recovery**
-   **Offline support**

## 🆘 Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**

    - Check `NEXT_PUBLIC_API_BASE_URL` is correct
    - Verify backend is running
    - Check network connectivity

2. **"Authentication failed"**

    - Clear localStorage and try again
    - Check token format
    - Verify backend authentication

3. **"File upload failed"**

    - Check file size (max 50MB)
    - Verify PDF format
    - Check token balance

4. **"Processing failed"**
    - Check token balance
    - Verify file content
    - Check backend logs

### Debug Mode

Enable debug logging by setting:

```javascript
localStorage.setItem("debug", "true");
```

## 📞 Support

For issues related to:

-   **Frontend integration** - Check this documentation
-   **Backend API** - Refer to API documentation
-   **Authentication** - Check token management
-   **File processing** - Verify API endpoints
