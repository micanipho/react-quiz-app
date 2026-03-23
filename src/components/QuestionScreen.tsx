import React from 'react';
import { Button, Card, Typography, Space } from 'antd';
import QuestionCard from './QuestionCard';
import { Question, UserAnswer } from '@/types';

const { Title, Text } = Typography;

interface QuestionScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedOptionIndex: number | null;
  onSelectAnswer: (questionId: string, selectedOptionIndex: number) => void;
  onNextQuestion: () => void;
  isNextButtonDisabled: boolean;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  selectedOptionIndex,
  onSelectAnswer,
  onNextQuestion,
  isNextButtonDisabled,
}) => {
  return (
    <Card
      title={<Title level={3} style={{ textAlign: 'center', margin: 0 }}>Question {currentQuestionIndex + 1} of {totalQuestions}</Title>}
      bordered={false}
      style={{ width: '100%', maxWidth: 600 }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <QuestionCard
          question={question}
          selectedOptionIndex={selectedOptionIndex}
          onSelectOption={(index) => onSelectAnswer(question.id, index)}
        />
        <Button
          type="primary"
          size="large"
          onClick={onNextQuestion}
          disabled={isNextButtonDisabled}
          block
        >
          {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </Space>
    </Card>
  );
};

export default QuestionScreen;
