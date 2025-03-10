# Use an official Node.js runtime as a base image
FROM node:23-alpine

# Set the working directory to /app
WORKDIR /app

# Copy backend package files to leverage Docker caching
COPY backend/package*.json ./backend/

# Change directory to the backend folder and install dependencies
WORKDIR /app/backend
RUN npm install

# Copy the entire backend source code into the container
COPY backend/ .

# Build the backend (for example, transpile TypeScript to JavaScript)
RUN npm run build

# Expose the backend port (adjust if your server listens on a different port)
EXPOSE 3000

# Start the backend service; ensure your package.json has a "start:backend" script
CMD ["npm", "run", "start:backend"]
