import React from "react";
import { Button, Portal } from "components";

interface SimpleModalProps {
  title: string;
  content: string;
  handleClick: () => void;
}

const SimpleModal = ({ title, content, handleClick }: SimpleModalProps) => {
  return (
    <Portal>
      <div className="max-h-fit">
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-bold">{title}</h2>
          <div>{content}</div>
        </div>
        <div className="flex flex-col mt-4">
          <Button onClick={handleClick}>닫기</Button>
        </div>
      </div>
    </Portal>
  );
};

export default SimpleModal;
