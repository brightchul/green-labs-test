import React, { useState } from "react";

import { Button, Input } from "components";
import { useAppDispatch, useToggle } from "hooks";
import { addFarm } from "stores/farmSlice";
import FarmAddModal from "./FarmAddModal";

const FarmAddForm = () => {
  /*TODO: Q2-2 API 통신 (Farm 의 문제를 다 끝내고 진행하셔도 무방합니다.)
    - api/addfarm 경로로 {name,crop} 값을 post 로 요청합니다.
    TODO: Q4 Portal 을 활용하여 모달을 구현합니다.
    - 위에서 호출된 결과 값을 화면에 출력 해야 합니다.
    - 예시는 이미지를 참고해 주세요
    TODO: Q4-1
    - 성공시 결과 값을 출력하는 구현해주세요
    TODO: Q4-2
    - 전달하는 값이 없을 경우 진행이 불가능하다는 모달을 출력해 주세요
    TODO: Q4-3
    - 각 모달에는 닫기 버튼을 추가하여 모달이 수동으로 닫혀야 합니다.
  */

  const [isSuccess, setSuccess] = useState(false);
  const [cropName, setCropName] = useState("");
  const [farmName, setFarmName] = useState("");

  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (!(farmName && cropName)) {
      setSuccess(false);
      toggleOpenModal();
      return;
    }

    const resultAction = await dispatch(addFarm({ farmName, cropName }));

    if (addFarm.fulfilled.match(resultAction)) {
      setSuccess(true);
      toggleOpenModal();
      return;
    }

    if (addFarm.rejected.match(resultAction)) {
      setSuccess(false);
      toggleOpenModal();
      return;
    }
  };

  const [isOpenModal, toggleOpenModal] = useToggle(false);

  return (
    <div className="flex flex-col gap-4 px-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span>농장 명</span>
          <Input
            name="name"
            type="text"
            onChange={(e) => setFarmName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <span>작물명</span>
          <Input
            name="name"
            type="text"
            onChange={(e) => setCropName(e.target.value)}
          />
        </div>
      </div>
      {isOpenModal && (
        <FarmAddModal
          cropName={cropName}
          farmName={farmName}
          isSuccess={isSuccess}
          handleClick={toggleOpenModal}
        />
      )}
      <Button onClick={handleClick}>저장</Button>
    </div>
  );
};

export default FarmAddForm;
