# File Explorer Backend

A robust Node.js backend service for file system operations, built with TypeScript and Express.

## Features

-   📁 **File System Operations**: Read directories and file details
-   🔒 **Security**: Safe file system access with path validation
-   🚀 **Performance**: Efficient file system operations
-   📝 **Type Safety**: Full TypeScript support
-   🛠️ **Error Handling**: Comprehensive error management
-   🌐 **Cross-Platform**: Works on Windows, macOS, and Linux

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express
-   **Language**: TypeScript
-   **Testing**: Jest
-   **Package Manager**: npm/yarn

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── fileController.ts
│   ├── services/        # Business logic
│   │   └── fileService.ts
│   ├── routes/          # API routes
│   │   └── fileRoutes.ts
│   ├── interfaces/      # TypeScript types
│   │   └── fileInterfaces.ts
│   ├── constants/       # Constants and error messages
│   │   └── error.ts
│   └── index.ts         # Application entry point
├── tests/               # Test files
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## API Endpoints

### List Directory Contents

```http
GET /api/files?path={directory-path}
```

**Response:**

```json
{
    "contents": [
        {
            "name": "example.txt",
            "type": "file",
            "size": 1024,
            "createdAt": "2024-03-25T12:00:00Z",
            "modifiedAt": "2024-03-25T12:00:00Z"
        }
    ]
}
```

### Get File Details

```http
GET /api/file?path={file-path}
```

**Response:**

```json
{
    "name": "example.txt",
    "type": "file",
    "size": 1024,
    "createdAt": "2024-03-25T12:00:00Z",
    "modifiedAt": "2024-03-25T12:00:00Z"
}
```

### Get Platform Information

```http
GET /api/platform
```

**Response:**

```json
{
    "platform": "darwin",
    "platformName": "macOS"
}
```

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

## Installation

1. **Navigate** to the backend folder:

    ```bash
    cd backend
    ```

2. **Install** dependencies:

    ```bash
    npm install
    # or
    yarn
    ```

3. **Build** the project:
    ```bash
    npm run build
    # or
    yarn build
    ```

## Development

Start the development server with hot reload:

```bash
npm run dev
# or
yarn dev
```

The server will start on http://localhost:3000

## Production

Start the production server:

```bash
npm start
# or
yarn start
```

## Docker

Build and run using Docker:

```bash
# Build
docker build -t file-explorer-backend .

# Run
docker run -p 3000:3000 file-explorer-backend
```

## Available Scripts

-   `npm run dev` - Start development server with hot reload
-   `npm run build` - Build the project
-   `npm start` - Start production server
-   `npm test` - Run tests
-   `npm run lint` - Run ESLint
-   `npm run type-check` - Run TypeScript type checking

## Error Handling

The API uses standardized error responses:

```json
{
    "error": "Error message",
    "details": "Additional error details"
}
```

Common error codes:

-   400: Bad Request
-   404: File/Directory not found
-   403: Access denied
-   500: Internal server error

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.
