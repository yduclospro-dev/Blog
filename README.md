# 📝 Blog Platform

A modern, full-featured blog platform built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## ✨ Features

- **User Authentication**: Registration, login, and session management
- **Article Management**: Create, read, update, and delete articles
- **Comment System**: Add, edit, delete, and interact with comments
- **Like/Dislike System**: React to articles and comments
- **Responsive Design**: Mobile-first approach with burger menu navigation
- **Author Permissions**: Only authors can edit/delete their own content
- **Container/Presenter Architecture**: Clean separation of concerns
- **Comprehensive Testing**: 382+ tests with Jest and React Testing Library
- **Type Safety**: Full TypeScript coverage
- **State Management**: Zustand for global state

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 10.x or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yduclospro-dev/Blog.git
   cd Blog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install all required packages including:
   - Next.js 15.5.4 (with Turbopack)
   - React 19.1.0
   - TypeScript 5
   - Tailwind CSS 4
   - Zustand 5.0.8
   - Jest 30.2.0
   - And all development dependencies

3. **Verify installation**

   Check that all dependencies are correctly installed:

   ```bash
   npm list --depth=0
   ```

### Running the Application

#### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

**Development Features:**
- Hot Module Replacement (HMR)
- Turbopack for faster builds
- Real-time error reporting
- Automatic TypeScript checking

#### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The optimized application will run at [http://localhost:3000](http://localhost:3000)

### Running Tests

#### Watch Mode (Recommended for Development)

Run all tests in watch mode with automatic re-runs on file changes:

```bash
npm test
```

#### Run All Tests Once

```bash
npm test -- --watchAll=false
```

#### Run Specific Test File

```bash
npm test -- NewArticleContainer
```

#### Run Tests with Coverage

```bash
npm test -- --coverage --watchAll=false
```

**Test Coverage:**
- Unit tests: Components, presenters, containers
- Integration tests: Store interactions
- 382+ tests covering all major features

### Code Quality

#### Linting

Check code quality with ESLint:

```bash
npm run lint
```

## 📁 Project Structure

```
Blog/
├── src/
│   ├── app/                      # Next.js app router pages
│   │   ├── articles/            # Article pages
│   │   ├── login/               # Login page
│   │   ├── registration/        # Registration page
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   │
│   ├── components/               # React components
│   │   ├── articles/            # Article-related components
│   │   │   ├── containers/      # Container components (logic)
│   │   │   ├── presenters/      # Presenter components (UI)
│   │   │   └── comments/        # Comment system
│   │   │
│   │   ├── auth/                # Authentication components
│   │   │   ├── login/
│   │   │   └── registration/
│   │   │
│   │   ├── home/                # Home page components
│   │   ├── layout/              # Layout components (Nav, Footer)
│   │   └── ui/                  # Reusable UI components
│   │       ├── Button/
│   │       ├── ButtonLink/
│   │       ├── Card/
│   │       ├── Input/
│   │       ├── TextArea/
│   │       └── LikeDislikeButtons/
│   │
│   ├── stores/                   # Zustand stores
│   │   ├── articlesStore.ts     # Article state management
│   │   ├── commentsStore.ts     # Comment state management
│   │   └── userStore.ts         # User authentication state
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── Article.ts
│   │   ├── Comment.ts
│   │   └── User.ts
│   │
│   └── tests/                    # Test files
│       └── ui/                   # Component tests
│
├── public/                       # Static assets
├── jest.config.mjs              # Jest configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🏗️ Architecture

### Container/Presenter Pattern

The project uses a clean separation between logic and presentation:

- **Containers**: Handle business logic, state management, and side effects
- **Presenters**: Pure UI components that receive props and render

**Example:**
```
ArticlesListContainer (logic) → ArticlesListPresenter (UI)
```

### State Management

**Zustand Stores:**
- `articlesStore`: Manages articles, CRUD operations, and likes/dislikes
- `commentsStore`: Manages comments with full CRUD and reactions
- `userStore`: Handles authentication and user session

### Component Library

Reusable UI components with variants and TypeScript types:
- Button (primary, secondary, outline, ghost)
- ButtonLink (navigation with styling)
- Card (content containers)
- Input (form inputs with auth variant)
- TextArea (auto-resize with variants)
- LikeDislikeButtons (interactive reactions)

## 🛠️ Technologies

### Core
- **Next.js 15.5.4**: React framework with App Router
- **React 19.1.0**: UI library
- **TypeScript 5**: Type safety
- **Tailwind CSS 4**: Utility-first styling

### State Management
- **Zustand 5.0.8**: Lightweight state management

### Testing
- **Jest 30.2.0**: Testing framework
- **React Testing Library 16.3.0**: Component testing
- **@testing-library/jest-dom**: Custom matchers

### Development Tools
- **Turbopack**: Fast bundler (Next.js)
- **ESLint 9**: Code linting
- **ts-jest**: TypeScript support for Jest

## 📝 Development Guidelines

### Naming Conventions
- **Components**: PascalCase (e.g., `ArticleCard.tsx`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ARTICLE_LENGTH`)
- **Types/Interfaces**: PascalCase (e.g., `ArticleProps`)

### File Organization
- Container components: `*Container.tsx`
- Presenter components: `*Presenter.tsx`
- Test files: `*.test.tsx`
- Type files: Use singular names (e.g., `Article.ts`)

### Testing Best Practices
- Write tests for all new features
- Follow AAA pattern: Arrange, Act, Assert
- Use descriptive test names
- Mock external dependencies
- Aim for high coverage (currently 382+ tests)