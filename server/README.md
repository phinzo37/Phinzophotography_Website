# Photography Backend Server

## Setup & Run

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start server:**
   ```bash
   npm run dev
   ```

3. **Server runs on:** http://localhost:5000

## Default Admin Login
- Username: `admin`
- Password: `password`

## API Endpoints
- `POST /api/login` - Admin login
- `GET /api/photos` - Get all photos
- `POST /api/photos` - Upload photo (requires auth)
- `PUT /api/photos/:id` - Update photo (requires auth)
- `DELETE /api/photos/:id` - Delete photo (requires auth)

## Next Steps
1. Start the server: `npm run dev`
2. Update frontend to use real API endpoints
3. Photos will be stored in `/server/uploads/`