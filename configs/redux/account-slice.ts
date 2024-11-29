import { BankAccountType, TypeDeposit, WithdrawType } from "@/constants/enum";
import { Account, Affiliate, AffiliateTier, Bank, BankToAdd, CrpytoBank, Downline, MailType, Record, Vip } from "@/constants/type";
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    //account
    accountDetail: <Account>null,
    accountBalance: 0,
    
    //Bank
    accountBankInfo: <Bank[]>[],
    myCurrentAccountBank: BankAccountType.ADD,

    //Add-Bank
    allListBank: <BankToAdd[]>[],

    //Net-Banking-Deposit
    currentDepositType: TypeDeposit.BANK,
    depositAgentNetBankingList: <Bank[]>[],
    currentAgentBankSelect: <Bank>{},
    bankTypeList: <Bank[]>[],
    currentBankTypeSelect: <Bank>{},
    depositAgentNetBankingFilter: <Bank[]>[],
    userNetBankingList: <Bank[]>[],
    reqTurnover: 1,

    //Crypto-Deposit
    agentCryptoBankList: <CrpytoBank[]>[],
    currentAgentCryptoSelect: <CrpytoBank>{},

    //Withdraw
    currentWithdraw: WithdrawType.ADD,

    //Record
    isFetchingRecord: false,
    startDateRecord: `${moment().startOf("week").format("YYYY-MM-DD")}`,
    endDateRecord: `${moment().format("YYYY-MM-DD")}`,
    recordList: <Record[]>[],

    //Mail
    isFetchingMail: false,
    inboxMails: <MailType[]>[],
    currentMailRead: null,
    isShowDeleteMailModal: false,

    //vip
    accountVipDetail: <Vip>null,
    affiliateTier: <AffiliateTier[]>[],
    accountAffiliateDetail: <Affiliate>null,
    downlineDetail: <Downline>null,

    //downline
    downlineCurrentMonthSearch: moment().startOf('month').format("YYYY-MM-DD"),
  },
  reducers: {
    //account
    setAccountDetail(state, action) {
      const account = action.payload

      state.accountDetail = account;
      state.accountBalance = account.balance;
    },
    setAccountBalance(state, action) {
      state.accountBalance = action.payload;
    },

    //Bank
    setAccountBankInfo(state, action) {
      state.accountBankInfo = action.payload;
    },
    setMyCurrentBankAccount(state, action) {
      state.myCurrentAccountBank = action.payload;
    },
    
    //Add-Bank
    setAllListBank(state, action) {
      state.allListBank = action.payload
    },
    addBankToListBank(state, action) {
      state.accountBankInfo = [...state.accountBankInfo, action.payload];
    },

    //Net-Banking-Deposit
    setCurrentDepositType(state, action) {
      state.currentDepositType = action.payload
    },
    setAllBankTypeList(state, action) {
      const allAgentBank = <Bank[]>action.payload
      state.depositAgentNetBankingList = allAgentBank
      state.currentAgentBankSelect = allAgentBank[0]
      const filterTypeBank = allAgentBank.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t?.bankName === value?.bankName
      )))
      if (filterTypeBank.length > 0) {
        state.bankTypeList = filterTypeBank
        state.currentBankTypeSelect = filterTypeBank[0]
        state.depositAgentNetBankingFilter = allAgentBank.filter(bank => bank?.bankName === filterTypeBank[0]?.bankName)
      }
    },
    setCurrentBankTypeSelect(state, action) {
      state.currentBankTypeSelect = action.payload
      state.depositAgentNetBankingFilter = state.depositAgentNetBankingList.filter(bank => bank?.bankName === action.payload.bankName)
      state.currentAgentBankSelect = state.depositAgentNetBankingFilter[0]
    },
    setCurrentAgentBankSelect(state, action) {
      state.currentAgentBankSelect = action.payload;
    },
    setUserNetBankingList(state, action) {
      state.userNetBankingList = action.payload;
    },
    setReqTurnover(state, action) {
      state.reqTurnover = action.payload
    },
    
    //Crypto-Deposit
    setAgentCryptoBankList(state, action) {
      state.agentCryptoBankList = action.payload
    },
    setCurrentAgentCryptoSelect(state, action) {
      state.currentAgentCryptoSelect = action.payload
    },

    //Withdraw
    setCurrentWithdraw(state, actions) {
      state.currentWithdraw = actions.payload;
    },

    //Record
    fetchingRecordStatus(state, action) {
      state.isFetchingRecord = action.payload;
    },
    setSearchingDate(state, action) {
      const dateValue = action.payload;

      state.startDateRecord = dateValue.startDate;
      state.endDateRecord = dateValue.endDate;
    },
    setRecordList(state, action) {
      state.recordList = action.payload;
    },

    //Mail
    fetchingMailStatus(state, action) {
      state.isFetchingMail = action.payload;
    },
    setInboxMail(state, action) {
      const allMail = action.payload;
      if (allMail) {
        const sortingMail = allMail.sort((a: any, b: any) => {
          return Number(new Date(b.creationTime)) - Number(new Date(a.creationTime))
        })
        state.inboxMails = sortingMail
      }
    },
    setCurrentMailRead(state, action) {
      const currentMail = action.payload;

      if (currentMail) {
        state.inboxMails = state.inboxMails.map((mail: any) => {
          if (mail.id === currentMail.id) {
            return { ...mail, status: true };
          }
          return mail;
        });
      }
      state.currentMailRead = currentMail;
    },
    setShowDeleteMailModal(state, action) {
      state.isShowDeleteMailModal = action.payload;
    },
    //Vip
    setAccountVipDetail(state, action) {
      state.accountVipDetail = action.payload
    },
    setAffiliateTier(state, action) {
      state.affiliateTier = action.payload
    },
    setAccountAffiliateDetail(state, action) {
      state.accountAffiliateDetail = action.payload
    },
    setDownlineDetail(state, action) {
      state.downlineDetail = action.payload
    },

    //Downline
    setDownlineCurrentMonthSearching(state, action) {
      state.downlineCurrentMonthSearch = action.payload
    }
  }
})

export const accountAction = accountSlice.actions
