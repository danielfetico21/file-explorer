# File Explorer Application

This repository contains the File Explorer Application, which is split into two main parts:

- **Backend:** A REST API built with Node.js, TypeScript, and Express for navigating the file system.
- **Frontend:** A client application (e.g., React or Angular) that will interact with the backend to display file and directory details.

## Repository Structure

file-explorer/
├── backend/         # Contains the backend API code
 │   └── README.md    # Backend documentation
├── frontend/        # Contains the frontend application (to be implemented)
 │   └── README.md    # Frontend documentation
├── docker-compose.yml  # Docker Compose file to run both backend and frontend together
└── README.md        # This file

## Getting Started

### Using Docker Compose

A `docker-compose.yml` file is provided to build and run the services. Currently, it runs the backend service, and a placeholder for the frontend is included for future expansion.

To build and run all services:

```bash
docker-compose up -d
```

* **Backend:** Accessible on [http://localhost:3000](http://localhost:3000/)
* **Frontend:** Will be accessible on its designated port once implemented.

### Manual Setup

* **Backend:** See [backend/README.md](https://./backend/README.md) for instructions.
* **Frontend:** See [frontend/README.md](https://./frontend/README.md) for details (currently a placeholder).
