import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from ".";

interface Farm {
  id: number;
  name: string;
  crops: string;
  houses?: { id: number; name: string; active: boolean }[];
  annualProduction: { month: number; Production: number }[];
}

interface FarmState {
  data: Farm[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}

const initialState: FarmState = {
  data: [],
  loading: "idle",
  error: "",
};

type FetchFarmListResponse = {
  farms: Farm[];
};

export const fetchFarmList = createAsyncThunk<FetchFarmListResponse>(
  "farm/fetchFarmList",
  async function () {
    const response = await fetch(`/api/farm`);
    return await response.json();
  }
);

interface AddFarmProps {
  farmName: string;
  cropName: string;
}

export const addFarm = createAsyncThunk(
  "farm/addFarm",
  async function ({ farmName, cropName }: AddFarmProps) {
    const response = await fetch(`/api/addfarm`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ farmName, cropName }),
    });
    return await response.json();
  }
);

export const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    toggleHouse: (state, action) => {
      const { farmId, houseId } = action.payload;
      const farm = state.data.find((farm) => farm.id === farmId);
      const house = farm?.houses?.find((house) => house.id === houseId);

      if (!house) return;
      house.active = !house.active;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFarmList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchFarmList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload.farms;
    });
    builder.addCase(fetchFarmList.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message ?? "";
    });
  },
});

export const selectFarmDomain = (state: RootState) => state.farm;

export const selectFarmLoading = (state: RootState) => state.farm.loading;

export const selectFarmData = (state: RootState) =>
  selectFarmDomain(state).data;

export const { toggleHouse } = farmSlice.actions;

export default farmSlice.reducer;
