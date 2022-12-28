import React from "react";
import { Button, Portal } from "components";

interface FarmAddModalProps {
  cropName: string;
  farmName: string;
  isSuccess: boolean;
  handleClick: () => void;
}

const FarmAddModal = ({
  cropName,
  farmName,
  isSuccess,
  handleClick,
}: FarmAddModalProps) => {
  return (
    <Portal>
      <div className="max-h-fit">
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-bold">
            {isSuccess ? "농장 추가 성공!" : "농장 추가 실패!"}
          </h2>

          {isSuccess && (
            <div className="flex gap-2">
              <span className="text-sm">{farmName}</span>
              <span className="text-sm font-semibold">{cropName}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <Button onClick={handleClick}>닫기</Button>
        </div>
      </div>
    </Portal>
  );
};

export default FarmAddModal;
