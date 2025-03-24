# Web II Final Project

[![built with nix](https://builtwithnix.org/badge.svg)](https://builtwithnix.org)

A simple blog app written with HTML and JS for my Web II course. It supports
creating, reading, updating, and deleting blog posts (CRUD), backed by a
Postgres database and served via an Express API.

## Tech Stack

- **Frontend**: Static HTML + Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: PostgreSQL

## Tech Stack (continued)

These weren't part of the assignment, but have become part of my development
workflow, and are thus included in this repo.

- **Dev tooling**: Nix, Docker, Prettier, Alejandra
- **CI**: GitHub Actions

## Directory Structure

```plaintext
Directory structure:
└── web2-project/
    ├── Dockerfile
    ├── docker-compose.yml
    ├── flake.lock
    ├── flake.nix
    ├── init.sql
    ├── package.json
    ├── server.js
    ├── nix/
    │   └── devShell.nix
    ├── public/
    │   ├── add.html
    │   ├── edit.html
    │   ├── index.html
    │   └── manage.html
    └── .github/
        └── workflows/
            └── lint.yml
```

## Running Locally

Make sure you have Docker and Nix installed.

### Development

```bash
nix develop       # sets up Node, Docker Compose, Alejandra
npm run docker:dev
```

This spins up:

- The Postgres DB (port 5432)
- The web app (port 3000)

Visit: `http://localhost:3000`

### API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/posts`     | Fetch all posts     |
| GET    | `/api/posts/:id` | Fetch a single post |
| POST   | `/api/posts`     | Create a new post   |
| PUT    | `/api/posts/:id` | Update a post       |
| DELETE | `/api/posts/:id` | Delete a post       |

## Linting & Formatting

Linting an formatting -- especially in CI -- was _not_ required for the assignment, but it's become habit for me to set this stuff up. If I was any more bored, I would have added tests and a `.prettierrc` file.

- **Prettier** for frontend and JS
- **Alejandra** for Nix

Run checks locally:

```bash
npm run lint
```

Or auto-format:

```bash
npm run format
```

CI will also lint on every push/pull request.
