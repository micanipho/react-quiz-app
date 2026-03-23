# React Quiz App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

1.  [Introduction](#1-introduction)
2.  [Features](#2-features)
3.  [Technology Stack](#3-technology-stack)
4.  [Architecture Overview](#4-architecture-overview)
    *   [Core Entities](#core-entities)
    *   [Component Structure](#component-structure)
    *   [State Management](#state-management)
    *   [Data Flow](#data-flow)
    *   [Styling & UI](#styling--ui)
5.  [Getting Started](#5-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Application](#running-the-application)
6.  [Usage](#6-usage)
7.  [Screenshots](#7-screenshots) (Placeholder)
8.  [Future Enhancements](#8-future-enhancements)
9.  [Contributing](#9-contributing)
10. [License](#10-license)

---

## 1. Introduction

The **React Quiz App** is a single-page interactive multiple-choice quiz application designed to provide a clean and engaging user experience. Built with **Next.js**, **TypeScript**, and **Ant Design**, this application guides users through a series of questions, tracks their progress and answers, and displays a final score upon completion. It's an entirely client-side application, demonstrating modern front-end development practices without requiring any backend services.

## 2. Features

*   **Start Screen:** A welcoming screen with a "Start Quiz" button to initiate the experience.
*   **Quiz Screen:** Displays questions one at a time, with a clear progress indicator.
*   **Multiple Choice Answers:** Each question presents four distinct answer options.
*   **Answer Selection:** Users can select one answer per question.
*   **Highlight Selected Answer:** The currently chosen answer option is visually distinguished.
*   **Next Question Navigation:** A "Next" button allows users to proceed after selecting an answer.
*   **Progress Indicator:** Visible display of "Question X of Y" to show current progress.
*   **Score Calculation:** Automatically calculates the final score based on correct selections.
*   **Final Score Display:** A dedicated screen showing the user's performance after completing the quiz.
*   **Quiz Restart:** A "Restart" button on the final score screen to retake the quiz.
*   **Clean & Minimal UI:** A centered, user-friendly interface focused on readability and ease of use.

## 3. Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) - A React framework for production, providing an excellent development experience for client-side applications.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) - A strongly typed superset of JavaScript that enhances code quality, readability, and maintainability.
*   **Styling:** [Ant Design](https://ant.design/) - An enterprise-class UI design language and React UI library, offering a rich set of high-quality, accessible components.
*   **Data Storage:** None (Hardcoded data)
*   **Database:** None
*   **ORM:** None
*   **Authentication:** None

## 4. Architecture Overview

The application follows a component-based architecture, typical for React applications, orchestrated within a Next.js environment.

### Core Entities

To ensure strong typing and clear data structures, the following TypeScript interfaces define the core entities:

*   **`Question`**: Represents a single quiz question.
    ```typescript
    interface Question {
      id: string;
      question: string;
      options: string[]; // Array of answer options
      correctAnswerIndex: number; // Index of the correct answer in the options array
    }
    ```
*   **`UserAnswer`**: Stores the user's selection for a specific question.
    ```typescript
    interface UserAnswer {
      questionId: string;
      selectedOptionIndex: number | null; // null if no answer selected yet
    }
    ```
*   **`QuizState`**: An enum or string literal type to manage the current phase of the quiz.
    ```typescript
    type QuizStage = 'start' | 'quiz' | 'result';
    ```

### Component Structure

The application's UI is composed of several key React components, each with a distinct responsibility:

*   **`pages/index.tsx` (Main Container):** The primary entry point and orchestrator of the application. It manages the overall quiz state (`QuizStage`, `currentQuestionIndex`, `userAnswers`, `score`) and conditionally renders the appropriate screen component.
*   **`StartScreen`:** Displays the initial welcome message and a "Start Quiz" button.
*   **`QuestionScreen`:** Responsible for rendering the current question, its options, and the navigation controls. It also displays the "Question X of Y" progress indicator.
*   **`QuestionCard`:** A sub-component of `QuestionScreen` that specifically renders a single question's text and its multiple-choice options using Ant Design's `Radio.Group`. It handles user selection and highlights the chosen option.
*   **`ResultScreen`:** Displays the final score and a "Restart Quiz" button, allowing users to play again.

### State Management

Centralized state management is handled within the main container component (e.g., `pages/index.tsx`) using React's `useState` or `useReducer` hooks. Key state variables include:

*   `quizStage`: Determines which major screen is currently visible (`'start'`, `'quiz'`, `'result'`).
*   `currentQuestionIndex`: An integer tracking the index of the question currently displayed.
*   `userAnswers`: An array of `UserAnswer` objects, storing the user's selected option for each question.
*   `score`: An integer representing the user's cumulative correct answers.

State updates are passed down as props to child components, and callbacks are used to propagate user interactions (e.g., answer selection, button clicks) back up to the parent to update the global quiz state.

### Data Flow

1.  **Questions Data:** A hardcoded array of `Question` objects is imported from a dedicated data file (e.g., `data/questions.ts`) into the main container component.
2.  **Quiz Initiation:** When the "Start Quiz" button is pressed, the `quizStage` transitions to `'quiz'`, and `currentQuestionIndex` is set to `0`.
3.  **Question Display:** The `QuestionScreen` receives the current question data based on `currentQuestionIndex` and renders it via `QuestionCard`.
4.  **Answer Selection:** When a user selects an option, `QuestionCard` communicates this back, updating the `userAnswers` array in the main container.
5.  **Navigation:** The "Next" button increments `currentQuestionIndex`. If all questions are answered, `quizStage` transitions to `'result'`.
6.  **Score Calculation:** On the `ResultScreen`, the `userAnswers` array is iterated, comparing each `selectedOptionIndex` with the `correctAnswerIndex` from the original `Question` data to calculate the final `score`.
7.  **Restart:** The "Restart Quiz" button resets all quiz-related state variables and transitions `quizStage` back to `'start'`.

### Styling & UI

*   **Ant Design:** Provides a robust set of UI components (e.g., `Button`, `Card`, `Space`, `Radio.Group`, `Typography`) that ensure a clean, modern, and consistent aesthetic. Its responsive design features help adapt the UI across different screen sizes.
*   **Custom Styling:** Minimal custom CSS (e.g., using CSS modules or inline styles) is applied to achieve specific layout requirements, such as centering the application content on the screen and visually highlighting the selected answer option within the `Radio.Group`.

## 5. Getting Started

Follow these instructions to set up and run the React Quiz App locally on your machine.

### Prerequisites

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)
*   npm or yarn (npm is included with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-quiz-app.git
    cd react-quiz-app
    ```
    (Replace `your-username/react-quiz-app` with the actual repository URL)

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

After installation, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will typically be accessible at `http://localhost:3000` in your web browser.

## 6. Usage

1.  **Start Screen:** Upon launching the application, you'll see a welcome screen. Click the "Start Quiz" button to begin.
2.  **Quiz Progression:**
    *   Each question will be displayed one at a time.
    *   Select one of the four multiple-choice options.
    *   Your selected answer will be highlighted.
    *   Click the "Next" button to proceed to the next question.
    *   A progress indicator (e.g., "Question 1 of 5") will show your current position.
3.  **Final Score:** After answering all questions, you'll be taken to the final score screen, which displays your performance.
4.  **Restart:** To retake the quiz, click the "Restart Quiz" button on the score screen.

## 7. Screenshots (Placeholder)

*(Here you would typically include screenshots of the Start Screen, Quiz Screen, and Result Screen to visually demonstrate the application.)*

## 8. Future Enhancements

*   **Timer:** Add a countdown timer for each question or for the entire quiz.
*   **Question Categories:** Implement categories for questions and allow users to select a category.
*   **Difficulty Levels:** Introduce different difficulty levels for questions.
*   **Dynamic Question Loading:** Integrate with a simple backend or a public API to fetch questions instead of hardcoding.
*   **User Feedback:** Provide immediate feedback (e.g., green for correct, red for incorrect) after each answer or upon quiz completion.
*   **Review Answers:** Allow users to review their answers and the correct answers at the end of the quiz.
*   **Animations:** Add subtle animations for screen transitions or answer selections.

## 9. Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## 10. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.