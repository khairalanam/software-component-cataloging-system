# Software Component Cataloging System

## Overview

Software Component Cataloging System (SCCS) is a project, developed as part of a software engineering course, allows users to manage software components efficiently. This system enables users to create, edit, delete, and search catalogs and their components. This system aims to streamline the organization and retrieval of software components, making development and maintenance more efficient.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
  - [Catalog Management](#catalog-management)
  - [Component Management](#component-management)
  - [Search Functionality](#search-functionality)
- [License](#license)

## Architecture Overview

The SCCS features a robust architecture leveraging ElectronJS for cross-platform desktop applications, React for dynamic user interfaces, Node.js for the backend logic, and SQLite for local data storage. Tailwind CSS and ShadCN are employed for styling, ensuring a sleek and responsive design. TypeScript provides type safety throughout the codebase, and Vite ensures fast builds and hot module replacement for an efficient development workflow.

## Tech Stack

- **ElectronJS**
- **React**
- **Tailwind CSS**
- **ShadCN**
- **Node.js**
- **SQLite**
- **TypeScript**
- **Vite**

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/khairalanam/sccs.git
   ```

2. Navigate to the project directory:

   ```bash
   cd sccs
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Features

### Catalog Management

- **Create Catalogs**: Easily create new catalogs to organize your software components. This feature allows you to group components based on projects, functionalities, or any other criteria that suit your workflow.
- **Edit Catalogs**: Modify existing catalogs to keep your organization up-to-date. You can rename catalogs, update descriptions, and make other changes to ensure your catalogs remain relevant.
- **Delete Catalogs**: Remove catalogs that are no longer needed. This helps in maintaining a clutter-free workspace and ensures that only active catalogs are kept in the system.

### Component Management

- **Create Components**: Add new components to your catalogs with detailed information, including names, descriptions, and other metadata. This feature supports a structured approach to documenting each component's purpose and usage.
- **Edit Components**: Update component details to ensure accuracy and relevancy. You can change any component’s information as requirements evolve or corrections are needed.
- **Delete Components**: Remove components that are obsolete or unnecessary. This ensures that your catalogs are always current and only contain useful components.

### Search Functionality

- **Search Components**: Quickly find components across all catalogs using a simple search feature. This allows you to locate specific components by name of the component without going to each catalog, saving time and enhancing productivity.

## License

The SCCS is open-source software released under the MIT License. See the [LICENSE](LICENSE) file for details.

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/khair-alanam) or [Twitter](https://twitter.com/khair_alanam).
