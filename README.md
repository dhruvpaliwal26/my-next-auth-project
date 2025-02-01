# My NextAuth Project

This is a simple authentication app using Next.js, NextAuth.js, Redux Toolkit for state management, and TailwindCSS for styling.

## Features

- Login page with mock credentials (email/password).
- Google login support.
- Redux session management.
- Dashboard to display user data after login.
- Logout functionality.

## Technologies Used

- **Next.js** (with TypeScript)
- **NextAuth.js** for authentication
- **Redux Toolkit** for state management
- **TailwindCSS** for styling

## How to Set Up Locally

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/my-next-auth-project.git
    ```

2.  Navigate into the project folder:

    ```bash
    cd my-next-auth-project
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env.local` file in the root directory with the following content:
    ```bash
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret-key
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret

        ```

5.  Run the development server:

    ```bash
    npm run dev
    ```

6.  Open `http://localhost:3000/login` in your browser to view the app.

## License

This project is licensed under the MIT License.
