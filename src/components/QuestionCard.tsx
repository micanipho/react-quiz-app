import React from 'react';
import { Card, Typography, Space } from 'antd';
import { Question } from '@/types/quiz';
import OptionButton from './OptionButton';

const { Title, Text } = Typography;

interface QuestionCardProps {
  question: Question;
  selectedAnswerIndex: number | null;
  onSelectAnswer: (index: number) => void;
  isAnswered: boolean;
  showCorrectAnswer: boolean; // For potential future feedback or score screen display
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswerIndex,
  onSelectAnswer,
  isAnswered,
  showCorrectAnswer,
}) => {
  return (
    <Card
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={4} style={{ marginBottom: 0 }}>
          {question.question}
        </Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              index={index}
              optionText={option}
              isSelected={selectedAnswerIndex === index}
              onSelect={onSelectAnswer}
              isCorrect={showCorrectAnswer && index === question.correctAnswerIndex}
              isAnswered={isAnswered}
              isIncorrectAndSelected={
                showCorrectAnswer &&
                selectedAnswerIndex === index &&
                selectedAnswerIndex !== question.correctAnswerIndex
              }
            />
          ))}
        </Space>
      </Space>
    </Card>
  );
};

export default QuestionCard;
