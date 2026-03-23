import React from 'react';
import { Typography, Radio, Space } from 'antd';
import { Question } from '@/types';

const { Paragraph } = Typography;

interface QuestionCardProps {
  question: Question;
  selectedOptionIndex: number | null;
  onSelectOption: (index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionIndex,
  onSelectOption,
}) => {
  const handleRadioChange = (e: any) => {
    onSelectOption(e.target.value);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <Paragraph strong>{question.question}</Paragraph>
      <Radio.Group onChange={handleRadioChange} value={selectedOptionIndex} style={{ width: '100%' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {question.options.map((option, index) => (
            <Radio
              key={index}
              value={index}
              style={{
                padding: '12px 16px',
                marginBlock: '4px',
                borderRadius: '8px',
                border: `1px solid ${selectedOptionIndex === index ? 'var(--ant-color-primary)' : 'var(--ant-color-border-secondary)'}`,
                backgroundColor: selectedOptionIndex === index ? 'var(--ant-color-primary-bg)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                transition: 'all 0.3s',
              }}
            >
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Space>
  );
};

export default QuestionCard;
