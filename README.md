# File Explorer Application

A modern file explorer application built with React and Node.js, featuring a clean UI and efficient file system navigation.

## Features

- 🗂️ **File System Navigation**: Browse directories and files with a modern interface
- 🔍 **File Details**: View detailed information about files and directories
- ⌨️ **Keyboard Navigation**: Full keyboard support for efficient navigation
- 🎨 **Modern UI**: Clean and responsive design
- 🔄 **Real-time Updates**: Instant feedback on file system changes
- 🚀 **Performance Optimized**: Efficient file loading and caching

## Repository Structure

```
file-explorer/
├── backend/               # Backend API (Node.js, TypeScript, Express)
│   ├── src/              # Source code
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API routes
│   │   └── interfaces/   # TypeScript types
│   └── README.md         # Backend documentation
├── frontend/             # Frontend application (React + TypeScript)
│   ├── src/             # Source code
│   │   ├── components/  # React components
│   │   │   ├── fileExplorer/  # File explorer specific components
│   │   │   ├── shared/       # Reusable components
│   │   │   └── common/       # UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── store/      # Redux store and slices
│   │   └── utils/      # Utility functions
│   └── README.md       # Frontend documentation
├── docker-compose.yml   # Docker Compose configuration
└── README.md           # This file
```

## Getting Started

### Using Docker Compose

The easiest way to run the application is using Docker Compose:

```bash
docker-compose up -d
```

This will start:

- **Backend:** http://localhost:3000
- **Frontend:** http://localhost:8080

### Manual Setup

1. **Backend Setup:**

   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. **Frontend Setup:**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Keyboard Navigation

- **ArrowDown**: Move selection down
- **ArrowUp**: Move selection up
- **Enter**: Open directory or show file info
- **Escape**: Go back one level

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
