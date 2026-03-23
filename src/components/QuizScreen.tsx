import React from 'react';
import { Button, Space, Typography, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/hooks/useQuiz';
import QuestionCard from './QuestionCard';
import ProgressIndicator from './ProgressIndicator';

const { Title } = Typography;

const QuizScreen: React.FC = () => {
  const router = useRouter();
  const {
    quizStatus,
    currentQuestionIndex,
    totalQuestions,
    currentQuestion,
    selectedAnswerIndexForCurrentQuestion,
    canProceedToNext,
    isQuizOver,
    dispatch,
  } = useQuiz();

  if (quizStatus === 'start') {
    // Should not happen if navigation is correct, but good for safety
    router.push('/');
    return null;
  }

  if (quizStatus === 'score') {
    router.push('/score');
    return null;
  }

  if (!currentQuestion) {
    return <Alert message="Error: No question found." type="error" showIcon />;
  }

  const handleSelectAnswer = (answerIndex: number) => {
    dispatch({
      type: 'SELECT_ANSWER',
      payload: { questionIndex: currentQuestionIndex, answerIndex },
    });
  };

  const handleNextQuestion = () => {
    if (isQuizOver) {
      router.push('/score');
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <ProgressIndicator
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <QuestionCard
        question={currentQuestion}
        selectedAnswerIndex={selectedAnswerIndexForCurrentQuestion}
        onSelectAnswer={handleSelectAnswer}
        isAnswered={selectedAnswerIndexForCurrentQuestion !== null}
        showCorrectAnswer={false}
      />
      <Button
        type="primary"
        size="large"
        onClick={handleNextQuestion}
        disabled={!canProceedToNext}
        block
      >
        {isQuizOver ? 'Finish Quiz' : 'Next Question'}
      </Button>
    </Space>
  );
};

export default QuizScreen;
