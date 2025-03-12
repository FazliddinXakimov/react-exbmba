import { createSlice } from "@reduxjs/toolkit";
import {
  getBanners,
  getRegions,
  getSelections,
  getSubjects,
  getTestTypes,
} from "../actions/referencesActions";
import {
  BANNER_TYPES,
  SELECTION_API_TYPES,
  SUBJECT_API_TYPES,
} from "../../utils/constants";

const initialState = {
  testTypes: [],
  englishTests: [],
  olympicTests: [],
  subjects: [],
  mainSubjects: [],
  topBanners: [],
  middleBanners: [],
  middleBelowBanners: [],
  regions: [],
  loading: false,
  error: null,
};

const referencesSlice = createSlice({
  name: "references",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET BANNERS
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.apiType === BANNER_TYPES.TOP) {
          state.topBanners = action.payload.response;
        } else if (action.payload.apiType === BANNER_TYPES.MIDDLE) {
          state.middleBanners = action.payload.response;
        } else if (action.payload.apiType === BANNER_TYPES.MIDDLE_BELOW) {
          state.middleBelowBanners = action.payload.response;
        }
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET TEST TYPES
      .addCase(getTestTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.testTypes = action.payload;
      })
      .addCase(getTestTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SELECTOINS
      .addCase(getSelections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelections.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.apiType === SELECTION_API_TYPES.ENGLISH) {
          state.englishTests = action.payload.response;
        } else if (action.payload.apiType === SELECTION_API_TYPES.OLYMPIC) {
          state.olympicTests = action.payload.response;
        }
      })
      .addCase(getSelections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET_SUBJECTS
      .addCase(getSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.apiType === SUBJECT_API_TYPES.SUBJECTS) {
          state.subjects = action.payload.response;
        } else if (action.payload.apiType === SUBJECT_API_TYPES.MAIN_SUBJECTS) {
          state.mainSubjects = action.payload.response;
        }
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET_REGIONS
      .addCase(getRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.loading = false;
        state.regions = action.payload;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {} = referencesSlice.actions;
export default referencesSlice.reducer;
