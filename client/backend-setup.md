# Backend Setup Required

## Current Status: Mock Mode
- Photos upload locally but don't persist
- Portfolio page uses separate mock data
- No real database connection

## To Enable Real Uploads:

### 1. Backend Server (Node.js/Express)
- Photo upload endpoint
- Database (MongoDB/PostgreSQL)
- File storage (AWS S3/Cloudinary)

### 2. Update Frontend
- Replace mock API calls with real endpoints
- Connect Portfolio page to same data source
- Add proper error handling

### 3. File Storage Options
- **Local**: Store in `/public/uploads`
- **Cloud**: AWS S3, Cloudinary, or similar

Would you like me to set up a basic backend server?