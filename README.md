
# Messenger Application

This is a simple messaging application built with modern web technologies like React, Vite, and SQLite. It features database integration and routing capabilities.

## Features

- **React Framework:** Built with React and Vite for fast development and performance.
- **Routing:** Powered by `@tanstack/router`.
- **Database Integration:** SQLite database for data persistence.
- **Styling:** Tailwind CSS for responsive and customizable designs.
- **Type Safety:** Fully typed with TypeScript.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **SQLite**: Installed locally (optional for inspecting the database).

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd messenger-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Scripts

- **Development:** Start the development server:
  ```bash
  npm run dev
  ```
  Default port: `3001`

- **Build:** Create a production build:
  ```bash
  npm run build
  ```

- **Preview:** Serve the production build locally:
  ```bash
  npm run serve
  ```

- **Type Check:** Validate TypeScript:
  ```bash
  npm run typecheck
  ```

## Project Structure

- **`src/main.tsx`**: Entry point of the application.
- **`src/routes`**: Defines the application's routing structure.
- **`src/db.ts`**: Database connection and operations.
- **`src/queryClient.ts`**: Setup for `@tanstack/react-query`.

## Database

- A SQLite database (`database.sqlite.db`) is used for storing application data.
- Initialize the database using the script:
  ```bash
  node init-db.ts
  ```

## Technologies

- **React**
- **Vite**
- **SQLite**
- **Tailwind CSS**
- **TypeScript**
- **@tanstack/react-query** for state management
