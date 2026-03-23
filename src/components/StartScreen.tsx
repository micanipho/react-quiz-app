import React from 'react';
import { Button, Card, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

interface StartScreenProps {
  onStartQuiz: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz }) => {
  return (
    <Card
      title={<Title level={2} style={{ textAlign: 'center', margin: 0 }}>Welcome to the React Quiz!</Title>}
      bordered={false}
      style={{ width: '100%', maxWidth: 500, textAlign: 'center' }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Paragraph>
          Test your knowledge with our interactive multiple-choice quiz.
        </Paragraph>
        <Button type="primary" size="large" onClick={onStartQuiz} block>
          Start Quiz
        </Button>
      </Space>
    </Card>
  );
};

export default StartScreen;
