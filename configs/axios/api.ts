import { Respond, TAddBankForm, TChangePasswordForm, TGameForm, TGetRecordsForm, TGetTransactionHistoryForm, TLinkGameForm, TLoginForm, TPromotionForm, TRegisterForm, TTransactionsForm } from "@/constants/type";
import request from "./axios-config"

const Tenant = {
  getTenant: () => request.post<Respond>("/services/app/Tenant/GetSettingCurrent", {}),
}

const Authentication = {
  register: (registerForm: TRegisterForm) => request.post<Respond>("/Account/Register", registerForm),
  login: (loginForm: TLoginForm) => request.post<Respond>("/account/login", loginForm)
}

const User = {
  getProfile: () => request.get<Respond>("/Account/GetProfile"),
  getInbox: () => request.post<Respond>("/services/app/notification/GetListNotification", {}),
  changePassword: (changePasswordForm: TChangePasswordForm) => request.post<Respond>("/Account/ChangePassword", changePasswordForm)
}

const Content = {
  getSlider: (tenant: string | unknown) => request.post<Respond>("/services/app/slider/GetAllSlider", {tenancyName: tenant}),
  getAnnouncement: (tenant: string | unknown) => request.post<Respond>("/services/app/announcement/ListAnnouncementUser", {tenancyName: tenant, type: "User"}),
  getGamesCategory: (gamesForm: TGameForm) => request.post<Respond>("/MPS/ByGameTypeAndPlatform", gamesForm),
  getLinkGame: (getLinkGame: TLinkGameForm) => request.post<Respond>("/MPS/GetMPSGameUrl", getLinkGame),
  contentSetting: (tenant: string | unknown) => request.post<Respond>("/services/app/ContentSetting/GetAllContentSetting", {tenancyName: tenant})
}

const Promotion = {
  getAll: (tenant: string | unknown) => request.post<Respond>("/services/app/promotion/GetAllPromotion", {tenancyName: tenant}),
  addPromotion: (promoForm: TPromotionForm) => request.post<Respond>("/services/app/bankTransaction/AddPromotion", {...promoForm}),
  terminatePromotion: (promoForm: TPromotionForm) => request.post<Respond>("/services/app/bankTransaction/TerminatePromotion", {...promoForm})
}

const Bank = {
  getInfoWithdrawBank: () => request.post<Respond>("/services/app/bankTransaction/GetInfoBank?type=withdraw", {}),
  getInfoDepositBank: () => request.post<Respond>("/services/app/bankTransaction/GetInfoBank?type=deposit", {}),
  getAllBank: () => request.post<Respond>("/services/app/bank/GetAllBank", {}),
  createBank: (addBankForm: TAddBankForm) => request.post<Respond>("/services/app/bankAccount/CreateBankAccountPlayer", addBankForm),
  bankTransaction: (transactionForm: TTransactionsForm) => request.post<Respond>("/services/app/bankTransaction/AddBankTransaction", transactionForm),
  getRecords: (getRecordForm: TGetRecordsForm) => request.post<Respond>("/services/app/transaction/GetTransactionByUserId", getRecordForm),
}

const Inbox = {
  getNotification: () => request.post<Respond>("/services/app/notification/GetListNotification", {}),
  readMail: (id?: number) => request.post<Respond>("/services/app/notification/IsReadNoti", {}, {
    params: { id }
  })
}

const TransactionReport = {
  getReportWinLoss: (startDate: string, endDate: string) => request.post<Respond>("/services/app/report/GetReportWinLossClient", {startDate, endDate}),
  getHistory: (getTransactionForm: TGetTransactionHistoryForm) => request.post<Respond>("/services/app/report/GetTnxHistoryClient", getTransactionForm)
}

const Vip = {
  getVipDetail: () => request.post<Respond>("/services/app/affiliateSetting/VipDetail", {}),
  getAffiliateDetail: () => request.post<Respond>("/services/app/affiliateSetting/AffiliateDetail", {}),
  withdrawAffiliate: (amount: number | string) => request.post<Respond>("/services/app/bankTransaction/WithdrawAffiliate", {}, {
    params: {
      amountChange: amount
    }
  }),
  getDownline: (date: string) => request.post<Respond>("/services/app/affiliateSetting/Downline", {}, {
    params: {
      timeStartDate: date
    }
  })

}

const httpClient = {
  User, Authentication, Content, Promotion, Bank, Inbox, TransactionReport, Tenant, Vip
}

export default httpClient;