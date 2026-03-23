export interface Question {
    id: string | number;         // Unique identifier for the question
    question: string;            // The text of the question
    options: string[];           // An array of multiple-choice answer strings
    correctAnswerIndex: number;  // The 0-based index of the correct answer within the 'options' array
}

export type QuizStatus = 'start' | 'quiz' | 'score';

export interface QuizState {
    currentQuestionIndex: number; // The index of the question currently being displayed
    userAnswers: (number | null)[]; // An array storing the 0-based index of the user's selected option for each question (null if not answered)
    quizStatus: QuizStatus;       // The current screen/state of the application
}

export type QuizAction =
    | { type: 'START_QUIZ' }
    | { type: 'SELECT_ANSWER'; payload: { questionIndex: number; answerIndex: number } }
    | { type: 'NEXT_QUESTION' }
    | { type: 'RESTART_QUIZ' };
