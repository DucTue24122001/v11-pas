import { GameReportInfo } from "@/constants/type";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export enum currentShowEnum {
  PLATFORM = "platform",
  GAME = "game"
}

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    isFetching: false,
    startDateReport: `${moment().startOf("week").format("YYYY-MM-DD 00:00:00")}`,
    endDateReport: `${moment().format("YYYY-MM-DD 23:59:59")}`,

    confirmStartDate: `${moment().startOf("week").format("YYYY-MM-DD 00:00:00")}`,
    confirmEndDate: `${moment().format("YYYY-MM-DD 23:59:59")}`,

    toggleShowPlatformAndGame: currentShowEnum.PLATFORM,

    currentPage: 1,
    totalCount: 0,
    pageSize: 0,
    
    grandTotalInfo: <any>{},
    totalTransitionInfo: [],
    totalGameReportInfo: <GameReportInfo[]>[],
    totalGameProfitLoss: "",
    currentPlatformName: "",

    isShowDetailModal: false,
    currentGameReport: {},
  },
  reducers: {
    handleFetchingData(state, action) {
      state.isFetching = action.payload
    },
    setSearchingDateReport(state, action) {
      const dateValue = action.payload;
      state.startDateReport = moment(dateValue.startDate).format("YYYY-MM-DD 00:00:00");
      state.endDateReport = moment(dateValue.endDate).format("YYYY-MM-DD 23:59:59");
    },
    setConfirmDateReport(state, action) {
      const dateValue = action.payload;
      state.confirmStartDate = dateValue.startDate;
      state.confirmEndDate = dateValue.endDate;
    },

    setTotalTransitionInfo(state, action) {
      state.totalTransitionInfo = action.payload
    },
    setTotalGameReportInfo(state, action) {
      state.totalGameReportInfo = action.payload
    },
    setTotalGameProfitLoss(state, action) {
      state.totalGameProfitLoss = action.payload
    },
    setCurrentPlatformName(state, action) {
      state.currentPlatformName = action.payload
    },
    setGrandTotalInfo(state, action) {
      state.grandTotalInfo = {
        ...action.payload
      }
    },

    handleToggleShowPlatformAndGame(state, action) {
      state.toggleShowPlatformAndGame = action.payload
    },

    handleShowDetailModal(state, action) {
      state.isShowDetailModal = action.payload
    },

    setCurrentGameReport(state, action) {
      state.currentGameReport = action.payload
    },
    
    //Paging
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload
    },
    setPagesize(state, action) {
      state.pageSize = action.payload
    },
  }
})

export const transactionReportAction = reportSlice.actions