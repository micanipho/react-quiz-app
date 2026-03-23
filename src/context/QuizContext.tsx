import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { QuizState, QuizAction, QuizStatus } from '@/types/quiz';
import { quizQuestions } from '@/data/questions';
import { getInitialQuizState } from '@/utils/quizLogic';

// Reducer function
const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...getInitialQuizState(quizQuestions.length), quizStatus: 'quiz' };
    case 'SELECT_ANSWER':
      {
        const { questionIndex, answerIndex } = action.payload;
        const newAnswers = [...state.userAnswers];
        newAnswers[questionIndex] = answerIndex;
        return { ...state, userAnswers: newAnswers };
      }
    case 'NEXT_QUESTION':
      {
        const nextIndex = state.currentQuestionIndex + 1;
        if (nextIndex < quizQuestions.length) {
          return { ...state, currentQuestionIndex: nextIndex };
        } else {
          return { ...state, quizStatus: 'score' };
        }
      }
    case 'RESTART_QUIZ':
      return getInitialQuizState(quizQuestions.length);
    default:
      return state;
  }
};

interface QuizContextType {
  quizState: QuizState;
  dispatch: Dispatch<QuizAction>;
  totalQuestions: number;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizState, dispatch] = useReducer(
    quizReducer,
    getInitialQuizState(quizQuestions.length)
  );

  const value = {
    quizState,
    dispatch,
    totalQuestions: quizQuestions.length,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
