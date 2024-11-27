# VRV Security’s Assignment: Role-Based Access Control (RBAC) UI

Welcome to the Role-Based Access Control (RBAC) project! This application provides a powerful solution for managing users, roles, and permissions. Built with a focus on simplicity, security, and scalability, this system is designed to streamline the process of maintaining user accounts and access control for your application.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Project Overview

Role-Based Access Control System offers a comprehensive approach to managing user data, including the ability to:

- Create, update, and delete user profiles
- Assign roles and permissions based on job responsibilities
- Track user activity and account status
- Integrate seamlessly with external systems such as Firebase for data storage and authentication

## Features

- **User CRUD Operations**: Manage user profiles, including creating, editing, and deleting users.
- **Role-Based Access Control (RBAC)**: Easily assign roles (e.g., Admin, Creators, Creator Lite) to ensure users have the right access levels.
- **User Status Management**: Set user status as 'Active' or 'Inactive' to control user access.
- **Pagination & Sorting**: Manage large user bases with sorting and pagination features.
- **Responsive Design**: Fully responsive interface for use on any device.
- **Firebase Integration**: Utilize Firebase for authentication and Firestore database integration to store user data securely.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Database**: Firebase (Firestore)
- **Authentication**: Firebase Authentication
- **Deployment**: Vercel

## Installation & Setup

To get started with this project, follow the steps below:

1. Clone the repository

    ```bash
    git clone [https://github.com/yourusername/user-management-system.git](https://github.com/lubnafathima/rbac.git)
    ```

2. Navigate to the project folder

    ```bash
    cd rbac
    ```

3. Install dependencies

    Run the following command to install the necessary dependencies:

    ```bash
    npm install
    ```

4. Add Environment Variables

    Create a `.env` file in the root directory and add the following variables:

    ```makefile
    VITE_FIREBASE_API_KEY=AIzaSyAJ7s8hsNlYSnBjrW9C8_dO-DXujhVulzo
    VITE_FIREBASE_AUTH_DOMAIN=vrv-security-assignment.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=vrv-security-assignment
    VITE_FIREBASE_STORAGE_BUCKET=vrv-security-assignment.firebasestorage.app
    VITE_FIREBASE_MESSAGING_SENDER_ID=1091950786640
    VITE_FIREBASE_APP_ID=1:1091950786640:web:870919e3d6b25547c4f955
    ```

## Environment Variables

- `VITE_FIREBASE_API_KEY`: The API key for Firebase Authentication and Firestore.
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase project’s Auth domain.
- `VITE_FIREBASE_PROJECT_ID`: Firebase Project ID.
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase Cloud Storage Bucket.
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase Sender ID for messaging.
- `VITE_FIREBASE_APP_ID`: Firebase App ID for the project.

## Usage

Once the project is set up, you can run the application locally using:

```bash
npm run dev
```
This will start a local development server, and you can access the app by navigating to http://localhost:5173/ in your browser.

## Folder Structure
The folder structure is organized as follows:

```bash
/public          # Public assets (e.g., favicon)
/src             # All source code files
  /assets        # Images
  /components    # Reusable UI components (dropdown, modal, table)
  /firebase      # Firebase configuration
  /pages         # React components for each page in the application
  /utils         # Utility functions
  App.jsx         # Main component that renders the app
  main.jsx       # Entry point for the app
/.env            # Environment variables (not included in the repo for security)
.gitignore       # Gitignore file to exclude sensitive files
README.md        # This documentation file
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Firebase for providing backend infrastructure and services.
React for making component-based development easy and efficient.
Tailwind CSS for a flexible and modern CSS framework.
Thank you for checking out the Role-Based Access Control (RBAC) project!

```vbnet

This markdown document is formatted with sections for each part of your project, including code blocks and lists where applicable.
```
