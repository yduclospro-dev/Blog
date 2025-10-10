This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Context

The goal of this project is to explore modern web development tools using JavaScript.
We use Next.js with TypeScript for the structure, Tailwind CSS for styling, Zustand for global state management, and Jest for testing.

We’ve built a blogging application where users can create an account, log in, and access a page with blog posts.
Authenticated users can create, edit, and delete their own posts.

## Architecture

The project follows a Container/Presenter architecture.
Each page or component has a Container (for the functional logic) and a Presenter (for the UI).

This structure keeps the project cleaner and easier to understand.
When changes are needed, you can simply locate the relevant component and decide whether you need to update the Container (logic) or the Presenter (view).

## Components

**Home Page :**
The Home container retrieves connection cookies.
If the user is logged in, they can access the blog and articles page.
Otherwise, they must log in and can navigate to the Login page.

**Gestion des utilisateurs :**
- Login
The login container manages session cookies to authenticate users who already have an account.
If the login fails, an error message is displayed.

User information is stored locally using Zustand and localStorage.
The Presenter contains the login form and a link to the registration page for new users.
Users can also log out, which deletes the authentication cookies.

- Registration
The registration container validates user input and checks whether the account already exists.
If everything is correct, a new user account is created and persisted in localStorage.
Otherwise, appropriate error messages are displayed.

The Presenter handles the registration form’s visual layout.
        
**Layout :**
- Nav & Footer
The components in ```/components/layout``` are shared across all pages and are imported into the ```RootLayout```.

## Data Persistence

Data is stored locally using the browser’s localStorage.
We use Zustand stores to manage accessibility and persistence of data across the app.

The user store allows creating, retrieving, and persisting user data.
The blog store allows creating, editing, deleting, and persisting blog posts, as well as retrieving them through getter functions.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
