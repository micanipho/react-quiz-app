import React from 'react';
import { Button, Typography, Space, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/hooks/useQuiz';

const { Title, Text } = Typography;

const ScoreScreen: React.FC = () => {
  const router = useRouter();
  const { score, totalQuestions, dispatch } = useQuiz();

  const handleRestartQuiz = () => {
    dispatch({ type: 'RESTART_QUIZ' });
    router.push('/');
  };

  return (
    <Card
      style={{
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Quiz Completed!</Title>
        <Text strong style={{ fontSize: '24px' }}>
          Your Score: {score} / {totalQuestions}
        </Text>
        <Button type="primary" size="large" onClick={handleRestartQuiz}>
          Restart Quiz
        </Button>
      </Space>
    </Card>
  );
};

export default ScoreScreen;
