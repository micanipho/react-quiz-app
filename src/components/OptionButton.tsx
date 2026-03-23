import React from 'react';
import { Button } from 'antd';

interface OptionButtonProps {
  index: number;
  optionText: string;
  isSelected: boolean;
  onSelect: (index: number) => void;
  isCorrect: boolean; // Indicates if this is the correct answer (for feedback)
  isAnswered: boolean; // Indicates if an answer has been selected for the question
  isIncorrectAndSelected: boolean; // Specific state for wrong but selected
}

const OptionButton: React.FC<OptionButtonProps> = ({
  index,
  optionText,
  isSelected,
  onSelect,
  isCorrect,
  isAnswered,
  isIncorrectAndSelected,
}) => {
  let buttonStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    height: 'auto', // Allow button height to adjust to content
    whiteSpace: 'normal', // Allow text to wrap
    padding: '10px 15px',
  };
  let buttonType: 'primary' | 'default' | 'dashed' | 'link' | 'text' = 'default';

  if (isAnswered) {
    if (isCorrect) {
      buttonType = 'primary';
      buttonStyle.backgroundColor = '#52c41a'; // Green for correct
      buttonStyle.borderColor = '#52c41a';
      buttonStyle.color = '#fff';
    } else if (isIncorrectAndSelected) {
      buttonType = 'primary';
      buttonStyle.backgroundColor = '#ff4d4f'; // Red for incorrect selected
      buttonStyle.borderColor = '#ff4d4f';
      buttonStyle.color = '#fff';
    } else if (isSelected) {
      // If already answered, and it's selected but not correct (handled by isIncorrectAndSelected)
      // or if it's just selected and not the correct answer, it remains default or slightly highlighted
      buttonStyle.borderColor = '#1890ff'; // Default highlight for selected
      buttonStyle.borderWidth = 2;
    }
  } else if (isSelected) {
    buttonType = 'primary'; // Highlight selected option before answering
  }

  return (
    <Button
      type={buttonType}
      style={buttonStyle}
      onClick={() => onSelect(index)}
      disabled={isAnswered && !isSelected} // Disable non-selected options once answered
    >
      {optionText}
    </Button>
  );
};

export default OptionButton;
