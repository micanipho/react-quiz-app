import { Question, QuizState } from '@/types/quiz';

export const calculateScore = (userAnswers: (number | null)[], questions: Question[]): number => {
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer !== null && questions[index] && answer === questions[index].correctAnswerIndex) {
            score++;
        }
    });
    return score;
};

export const getInitialQuizState = (totalQuestions: number): QuizState => ({
    currentQuestionIndex: 0,
    userAnswers: Array(totalQuestions).fill(null),
    quizStatus: 'start', // 'start' | 'quiz' | 'score'
});
