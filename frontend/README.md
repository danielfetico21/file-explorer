# Frontend

A React-based frontend application for our file explorer. This README describes how to install dependencies, run the development server, build for production, and run in Docker.

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**

*(If you’re only running via Docker, you don’t strictly need Node installed locally.)*

## Installation

1. **Navigate** to the frontend folder:

   ```bash
   cd frontend
   ```
2. **Install** the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn
   ```
3. Make sure you set any **environment variables** if needed (e.g., `VITE_API_URL`).

## Development

- **Start** the dev server (with hot reload):

  ```bash
  npm run dev
  ```

  or

  ```bash
  yarn dev
  ```
- Open the link shown in your terminal—often [http://localhost:5173](http://localhost:5173)—in your browser.

## Production Build

1. **Build** the production bundle:

   ```bash
   npm run build
   ```
2. **Serve** the production files locally (optional):

   ```bash
   npm install -g serve
   serve -s dist
   ```

   Then open [http://localhost:5000](http://localhost:5000).

## Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npx", "serve", "-s", "dist", "-l", "5000"]
```

### Build & Run

```bash
docker build -t file-explorer-frontend .
docker run -p 5000:5000 file-explorer-frontend
```

Open [http://localhost:5000](http://localhost:5000).

## Folder Structure

```
frontend/
  ├── public/
  ├── src/
  ├── package.json
  ├── tsconfig.json
  ├── Dockerfile
  └── ...
```


## Keyboard Navigation

> **Note:** You must press `<kbd>`Tab`</kbd>` to focus on the file grid before using these keys.

- **ArrowDown**: Move the selection down
- **ArrowUp**: Move the selection up
- **Enter**: Open a directory or show file info
- **Escape**: Go back
