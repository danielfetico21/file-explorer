

# File Explorer Backend


This is the backend portion of the File Explorer Application. It is built with Node.js, TypeScript, and Express and provides the following REST API endpoints:

- **GET /api/files?path={path}**  
  Lists the contents of a directory, returning details for each file or subdirectory.

- **GET /api/file?path={path}**  
  Retrieves detailed information (name, type, size, creation date, last modified date) about a single file or directory.

- **GET /api/platform**  
  Returns the platform (Windows, MacOS, Linux) on which the server is running.

## Project Structure

backend/
├── src/
 │ ├── controllers/
 │  │ └── fileController.ts # Handles API requests and responses
 │ ├── constants/
 │  │ └── error.ts # Contains error message constants
 │ ├── interfaces/
 │  │ └── interface.ts # TypeScript interfaces (e.g., DirectoryItem, FileInfo)
 │ ├── routes/
 │  │ └── fileRoutes.ts # Maps API endpoints to controllers
 │ ├── services/
 │  │ └── fileService.ts # Business logic for file system operations
 │ └── index.ts # Application entry point
├── Dockerfile # Dockerfile to build and run the backend service
├── package.json # npm configuration and scripts
└── tsconfig.json # TypeScript configuration



2. **Install dependencies:**
   bash

   Copy

   ```
   npm install
   ```
3. **Build the project (transpile TypeScript to JavaScript):**
   bash

   Copy

   ```
   npm run build
   ```
4. **Start the server:**
   bash

   Copy

   ```
   npm run start:backend
   ```

   The server will start on port 3000 by default.

### Development Mode

For automatic reloading during development, you can use nodemon:

bash

Copy

```
npm run dev:backend
```

### Running with Docker

To run the backend using Docker:

1. **Build the Docker image:**
   bash

   Copy

   ```
   docker build -t backend-app .
   ```
2. **Run the Docker container:**
   bash

   Copy

   ```
   docker run -d -p 3000:3000 backend-app
   ```

> **Note:** Without volume mounts, the container only has access to its own filesystem. To navigate host files, mount the appropriate host directories.

## API Documentation

### API Endpoints

* **List Directory Contents:**
  `GET /api/files?path={directory-path}`
* **Get File/Directory Details:**
  `GET /api/file?path={file-or-directory-path}`
* **Get Platform Information:**
  `GET /api/platform`

## Error Handling

Error messages are centralized in `src/constants/error.ts` for consistency.

## License

This project is licensed under the MIT License.
