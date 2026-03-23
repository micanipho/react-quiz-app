# React Quiz App

A front-end only multiple-choice quiz application built with Next.js, TypeScript, and Ant Design. This project provides an engaging and interactive quiz experience, guiding users through distinct states from starting the quiz to viewing their final score.

## Table of Contents

*   [Introduction](#introduction)
*   [Features](#features)
*   [Technology Stack](#technology-stack)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Application](#running-the-application)
*   [Application Flow](#application-flow)
*   [Core Entities](#core-entities)
*   [Architecture & Design Choices](#architecture--design-choices)
*   [Future Enhancements](#future-enhancements)
*   [Contributing](#contributing)
*   [License](#license)

## Introduction

The React Quiz App is a demonstration of a modern, client-side web application built entirely using the React ecosystem. It's designed to be intuitive and user-friendly, offering a clear progression through a series of multiple-choice questions. With a strong emphasis on clean UI and robust client-side logic, the application is perfect for a quick knowledge check or as a foundational example for more complex interactive experiences.

## Features

The application provides a comprehensive set of features to deliver a complete quiz experience:

*   **Start Screen:**
    *   A welcoming screen with a prominent "Start" button to begin the quiz.
*   **Quiz Screen:**
    *   Presents one question at a time to the user.
    *   Each question comes with exactly four multiple-choice answer options.
    *   Users can select one answer option, which is visually highlighted upon selection.
    *   A "Next" button allows progression to the subsequent question.
    *   A clear progress indicator (e.g., "Question 1 of 5") keeps the user informed of their progress.
*   **Score Screen:**
    *   Displays the user's final score once all questions have been answered.
    *   Includes a "Restart" button to allow users to play the quiz again from the beginning.
*   **Data & Logic:**
    *   All quiz questions are provided as a hardcoded array within the application, ensuring no external dependencies.
    *   The application internally tracks the current question index, user's selected answer for each question, and calculates the final score.
    *   Score calculation is based on comparing user selections against the correct answer index for each question.
*   **User Interface (UI):**
    *   Clean, minimal, and aesthetically pleasing design.
    *   Layout is consistently centered on the screen for optimal readability.
    *   Selected answer options are visually distinct through highlighting.
    *   Entirely client-side with no backend services required.

## Technology Stack

*   **Framework:** Next.js (React Framework)
*   **Language:** TypeScript
*   **Styling/UI Library:** Ant Design
*   **State Management:** React's built-in `useState` and `useReducer` hooks
*   **Database:** None (Hardcoded data)
*   **ORM:** None
*   **Authentication:** None

## Getting Started

Follow these instructions to set up and run the React Quiz App locally on your machine.

### Prerequisites

*   **Node.js:** Ensure you have the latest LTS version of Node.js installed.
*   **npm** or **yarn:** A package manager for JavaScript.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd react-quiz-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will now be accessible in your web browser at `http://localhost:3000`.

## Application Flow

The quiz application operates through a well-defined state machine, transitioning between three main screens:

```mermaid
graph TD
    A[Start Screen] --> B{Click "Start"};
    B --> C[Quiz Screen];
    C --> D{Answer Question & Click "Next"};
    D -- All Questions Answered --> E[Score Screen];
    D -- More Questions Remain --> C;
    E --> F{Click "Restart"};
    F --> A;
```

## Core Entities

The application's logic revolves around a few key data structures:

*   ### `Question`
    Represents a single quiz question with its options and correct answer.

    ```typescript
    interface Question {
        id: string | number;         // Unique identifier for the question
        question: string;            // The text of the question
        options: string[];           // An array of multiple-choice answer strings
        correctAnswerIndex: number;  // The 0-based index of the correct answer within the 'options' array
    }
    ```

*   ### `QuizState`
    An aggregate of state variables that define the current status and progress of the quiz.

    ```typescript
    interface QuizState {
        currentQuestionIndex: number; // The index of the question currently being displayed
        userAnswers: (number | null)[]; // An array storing the 0-based index of the user's selected option for each question (null if not answered)
        quizStatus: 'start' | 'quiz' | 'score'; // The current screen/state of the application
    }
    ```

*   ### `UserAnswer` (Implicit)
    While not a standalone object, the user's selection for each question is tracked as a `number` (the index of the chosen option) within the `userAnswers` array of the `QuizState`.

## Architecture & Design Choices

*   **Component-Based Structure:** The application is logically segmented into reusable React components (e.g., `StartScreen`, `QuizScreen`, `ScoreScreen`, `QuestionCard`, `OptionButton`). This modular approach enhances maintainability, readability, and reusability.
*   **Client-Side State Management:** The quiz's entire state (current question, user answers, quiz status) is managed using React's built-in `useState` and `useReducer` hooks. This keeps the application self-contained, performant, and avoids the need for external state management libraries for this scope.
*   **TypeScript for Type Safety:** The use of TypeScript ensures strong typing throughout the application, significantly reducing runtime errors, improving code quality, and providing better developer tooling and understanding of data structures like `Question` and `QuizState`.
*   **Next.js Framework:** Next.js provides a robust and optimized foundation for the React application. While this project doesn't fully leverage server-side rendering or API routes, Next.js still offers benefits like file-system based routing (useful for potential future expansion), optimized builds, and a streamlined development experience.
*   **Ant Design for UI/UX:** Ant Design is employed as the primary UI library. It accelerates development by providing a rich set of high-quality, pre-built components that adhere to modern design principles, ensuring a clean, consistent, and responsive user interface with minimal custom CSS.
*   **Hardcoded Data:** To fulfill the "front-end only" requirement, all quiz questions are hardcoded directly into the application's source code, simplifying the data layer and removing any external dependencies.

## Future Enhancements

*   **Dynamic Question Loading:** Implement functionality to fetch quiz questions from an external API or a local JSON file.
*   **Timer Functionality:** Add a countdown timer for each question or for the entire quiz duration.
*   **Difficulty Levels:** Introduce different sets of questions based on varying difficulty levels.
*   **Immediate Feedback:** Provide instant visual feedback (correct/incorrect) after each answer selection.
*   **Animations & Transitions:** Enhance the user experience with subtle UI animations and screen transitions.
*   **Accessibility Improvements:** Further refine ARIA attributes and keyboard navigation for improved accessibility.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---