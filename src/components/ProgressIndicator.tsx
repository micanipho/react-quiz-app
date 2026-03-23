import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface ProgressIndicatorProps {
  currentQuestionNumber: number;
  totalQuestions: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestionNumber,
  totalQuestions,
}) => {
  return (
    <Text strong style={{ fontSize: '16px', display: 'block', textAlign: 'center', marginBottom: '16px' }}>
      Question {currentQuestionNumber} of {totalQuestions}
    </Text>
  );
};

export default ProgressIndicator;
