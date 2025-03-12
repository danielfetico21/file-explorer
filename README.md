
# File Explorer Application

This repository contains a **File Explorer Application** split into two major parts:

- **Backend**: A REST API (Node.js, TypeScript, Express) for navigating the file system.
- **Frontend**: A client application React that displays file and directory details by consuming the backend API.

---

## Repository Structure

file-explorer/

├── backend/               # Backend API code

│   └── README.md          # Backend documentation

├── frontend/              # Frontend application (currently a placeholder)

│   └── README.md          # Frontend documentation

├── docker-compose.yml      # Docker Compose file to run backend & frontend

└── README.md              # This file (main repo documentation)

## Getting Started

### Using Docker Compose

A `docker-compose.yml` file is provided to build and run both services. At present, it runs the **backend** and includes a placeholder for the **frontend**:

```bash
docker-compose up -d
```

Once built:

* **Backend:** Accessible at [http://localhost:3000](http://localhost:3000/)
* **Frontend:** Accessible at [http://localhost:](http://localhost:3000/)8080

### Manual Setup

* **Backend** : See [backend/README.md](https://chatgpt.com/c/backend/README.md) for detailed instructions.
* **Frontend** : See [frontend/README.md](https://chatgpt.com/c/frontend/README.md) for details (currently a placeholder).

---

## Keyboard Navigation

> **Note** : You must press Tab to focus the file grid before using these keys.

* **ArrowDown** : Move selection down
* **ArrowUp** : Move selection up
* **Enter** : Open a directory or show file info
* **Escape** : Go back one level
