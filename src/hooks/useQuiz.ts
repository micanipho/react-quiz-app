import { useContext } from 'react';
import { QuizContext } from '@/context/QuizContext';
import { QuizState, QuizAction, Question } from '@/types/quiz';
import { quizQuestions } from '@/data/questions'; // Assuming questions are globally available
import { calculateScore } from '@/utils/quizLogic';

interface UseQuizReturnType {
  quizState: QuizState;
  dispatch: Dispatch<QuizAction>;
  currentQuestion: Question | undefined;
  totalQuestions: number;
  score: number;
  isQuizOver: boolean;
  selectedAnswerIndexForCurrentQuestion: number | null;
  canProceedToNext: boolean;
  quizStatus: QuizState['quizStatus'];
}

export const useQuiz = (): UseQuizReturnType => {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  const { quizState, dispatch, totalQuestions } = context;
  const { currentQuestionIndex, userAnswers, quizStatus } = quizState;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const score = calculateScore(userAnswers, quizQuestions);
  const isQuizOver = currentQuestionIndex === totalQuestions - 1 && userAnswers[currentQuestionIndex] !== null;
  const selectedAnswerIndexForCurrentQuestion = userAnswers[currentQuestionIndex];
  const canProceedToNext = selectedAnswerIndexForCurrentQuestion !== null;

  return {
    quizState,
    dispatch,
    currentQuestion,
    totalQuestions,
    score,
    isQuizOver,
    selectedAnswerIndexForCurrentQuestion,
    canProceedToNext,
    quizStatus,
  };
};
