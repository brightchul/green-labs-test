import React, { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "hooks";
import { FarmsType } from "libs/type";
import { fetchFarmList, selectFarmData } from "stores/farmSlice";
import FarmList from "./FarmList";

function sumAnnualProduction(farm: FarmsType) {
  let productionTotal = 0;
  farm.annualProduction.forEach(
    ({ Production }) => (productionTotal += Production)
  );
  return productionTotal;
}

const Farm = () => {
  /* TODO: Q2-1 api 통신
  - api/farm 경로로 get)api 요청하면 Array<FarmsType> 형태의 데이터가 호출됩니다. (axios, fetch 등 사용은 자율)
  - 호출 받은 데이터를 활용하여 동일 경로에 있는 FarmList 컴포넌트를 랜더링 해주세요 예시 화면은 이미지를 확인 하세요.
  /* TODO: Q3-1 화면 조작
  - 호출 받은 데이터중 annualProduction 은 월별 생산량을 가지고 있습니다. 월별 생산량의 총 합을 구하는 함수를 작성해서 
    계산된 값을 FarmList 컴포넌트의 productionTotal Props 로 내려주세요
  /* TODO: Q3-2 화면 조작
  - 랜더링 된 컴포넌트에서 하우스를 동작시키는 함수를 작성해 주세요 역시 예시 이미지를 확인 하세요.
  */

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFarmList());
  }, []);

  const farmData = useAppSelector(selectFarmData);

  const farmList = useMemo(() => {
    return farmData.map((farm) => ({
      ...farm,
      productionTotal: sumAnnualProduction(farm),
      HouseActive: (farmId: number, houseId: number) => {
        // TODO: house 조작 함수 추가
      },
    }));
  }, [farmData]);

  return (
    <div className="px-2 flex flex-col gap-2">
      {farmData.length > 0 &&
        farmList.map((farm) => <FarmList key={farm.id} {...farm} />)}
    </div>
  );
};

export default Farm;
