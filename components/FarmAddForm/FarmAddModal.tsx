import React from "react";
import { Button, Portal } from "components";

interface FarmAddModalProps {
  farmName: string;
  cropName: string;
  handleClick: () => void;
}

const FarmAddModal = ({
  farmName,
  cropName,
  handleClick,
}: FarmAddModalProps) => {
  return (
    <Portal>
      <div className="max-h-fit">
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-bold">농장 추가 성공!</h2>

          <div className="flex gap-2">
            <span className="text-sm">{farmName}</span>
            <span className="text-sm font-semibold">{cropName}</span>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <Button onClick={handleClick}>닫기</Button>
        </div>
      </div>
    </Portal>
  );
};

export default FarmAddModal;
