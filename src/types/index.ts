export interface Question {
  id: string;
  question: string;
  options: string[]; // Array of answer options
  correctAnswerIndex: number; // Index of the correct answer in the options array
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIndex: number | null; // null if no answer selected yet
}

export type QuizStage = 'start' | 'quiz' | 'result';
