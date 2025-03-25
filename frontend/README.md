# File Explorer Frontend

A modern React application for browsing and managing files, built with TypeScript and Redux Toolkit.

## Features

- 🎨 **Modern UI Components**: Clean and responsive design
- 🔄 **State Management**: Efficient Redux implementation with Redux Toolkit
- 🎯 **Type Safety**: Full TypeScript support
- 🚀 **Performance**: Optimized rendering and file loading
- ⌨️ **Keyboard Navigation**: Full keyboard support
- 📱 **Responsive Design**: Works on all screen sizes

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── fileExplorer/   # File explorer specific components
│   │   │   ├── FileGrid.tsx
│   │   │   ├── FileList.tsx
│   │   │   └── ...
│   │   ├── shared/        # Reusable components
│   │   │   ├── BackButton.tsx
│   │   │   ├── Breadcrumbs.tsx
│   │   │   └── ...
│   │   └── common/        # UI components
│   ├── hooks/             # Custom React hooks
│   │   ├── useExplorerController.ts
│   │   ├── useFetchDirectory.ts
│   │   └── ...
│   ├── store/             # Redux store
│   │   ├── fileSlice.ts
│   │   ├── fileThunks.ts
│   │   └── ...
│   ├── utils/             # Utility functions
│   └── interfaces/        # TypeScript types
├── public/                # Static assets
└── package.json          # Dependencies and scripts
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. **Navigate** to the frontend folder:

   ```bash
   cd frontend
   ```
2. **Install** dependencies:

   ```bash
   npm install
   # or
   yarn
   ```
3. **Environment Setup**:
   Create a `.env` file in the frontend directory:

   ```
   VITE_API_URL=http://localhost:3000
   ```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## Production Build

1. **Build** the application:

   ```bash
   npm run build
   # or
   yarn build
   ```
2. **Preview** the production build:

   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Docker

Build and run using Docker:

```bash
# Build
docker build -t file-explorer-frontend .

# Run
docker run -p 5173:5173 file-explorer-frontend
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Keyboard Navigation

> **Note:** Press Tab to focus the file grid before using these keys.

- **ArrowDown**: Move selection down
- **ArrowUp**: Move selection up
- **Enter**: Open directory or show file info
- **Escape**: Go back one level

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
