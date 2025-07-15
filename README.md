# Photography Portfolio Website

A minimalist photography portfolio website built with React and TypeScript. Currently running in development mode with mock data.

## Features

- Clean, minimalist design
- Responsive layout
- Photo gallery with hover effects
- Admin panel for photo management (mock functionality)
- Contact form
- Smooth page transitions
- Dark/light theme toggle

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Framer Motion
- React Router

## Prerequisites

- Node.js (v14 or higher)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd gurungPhotography
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd client
npm install
```

3. Start the development server:
```bash
# Start frontend server
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
gurungPhotography/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── App.tsx       # Main application component
│   │   └── main.tsx      # Application entry point
│   └── package.json
└── README.md
```

## Development Mode

The application is currently running in development mode with the following features:

- **Mock Data**: All photos are loaded from mock data using Unsplash images
- **Mock Admin Panel**: The admin panel simulates upload and delete operations
- **Mock Authentication**: Any username/password will work for admin login
- **No Backend**: The application runs entirely on the frontend

## Future Backend Integration

When you're ready to add a backend, you can:

1. Create a new server directory
2. Set up your preferred backend framework (Express.js, Fastify, etc.)
3. Implement the API endpoints that the frontend expects
4. Replace the mock data and functions with real API calls

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 