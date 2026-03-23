import React from 'react';
import { Button, Card, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestartQuiz: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRestartQuiz,
}) => {
  return (
    <Card
      title={<Title level={2} style={{ textAlign: 'center', margin: 0 }}>Quiz Completed!</Title>}
      bordered={false}
      style={{ width: '100%', maxWidth: 500, textAlign: 'center' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Paragraph>
          You scored <Text strong style={{ fontSize: '24px' }}>{score}</Text> out of <Text strong style={{ fontSize: '24px' }}>{totalQuestions}</Text> correct answers!
        </Paragraph>
        <Button type="primary" size="large" onClick={onRestartQuiz} block>
          Restart Quiz
        </Button>
      </Space>
    </Card>
  );
};

export default ResultScreen;
