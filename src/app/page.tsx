import React, { useState, useEffect } from 'react';
import StartScreen from '@/components/StartScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';
import { Question, UserAnswer, QuizStage } from '@/types';
import { questions } from '@/data/questions';
import { Space } from 'antd';

const HomePage: React.FC = () => {
  const [quizStage, setQuizStage] = useState<QuizStage>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Initialize userAnswers when starting a new quiz or on first load
    if (quizStage === 'quiz' && userAnswers.length === 0) {
      const initialAnswers: UserAnswer[] = questions.map(q => ({
        questionId: q.id,
        selectedOptionIndex: null,
      }));
      setUserAnswers(initialAnswers);
    }
  }, [quizStage, userAnswers.length]);

  const handleStartQuiz = () => {
    setQuizStage('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers(questions.map(q => ({ questionId: q.id, selectedOptionIndex: null })));
    setScore(0);
  };

  const handleSelectAnswer = (questionId: string, selectedOptionIndex: number) => {
    setUserAnswers(prevAnswers =>
      prevAnswers.map(answer =>
        answer.questionId === questionId
          ? { ...answer, selectedOptionIndex }
          : answer
      )
    );
  };

  const handleNextQuestion = () => {
    const currentAnswer = userAnswers.find(ua => ua.questionId === questions[currentQuestionIndex].id);
    if (currentAnswer && currentAnswer.selectedOptionIndex !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        // Last question answered, calculate score and go to result screen
        calculateScore();
        setQuizStage('result');
      }
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    userAnswers.forEach(userAnswer => {
      const question = questions.find(q => q.id === userAnswer.questionId);
      if (question && userAnswer.selectedOptionIndex === question.correctAnswerIndex) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const handleRestartQuiz = () => {
    setQuizStage('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentSelectedOptionIndex = userAnswers.find(ua => ua.questionId === currentQuestion?.id)?.selectedOptionIndex;

  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '24px',
        width: '100%',
        backgroundColor: 'var(--ant-color-bg-layout)'
      }}
    >
      {quizStage === 'start' && <StartScreen onStartQuiz={handleStartQuiz} />}
      {quizStage === 'quiz' && currentQuestion && (
        <QuestionScreen
          question={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedOptionIndex={currentSelectedOptionIndex}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          isNextButtonDisabled={currentSelectedOptionIndex === null}
        />
      )}
      {quizStage === 'result' && (
        <ResultScreen
          score={score}
          totalQuestions={questions.length}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </Space>
  );
};

export default HomePage;
