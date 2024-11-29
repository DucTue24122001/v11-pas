export type TenancyType = null | {
  mainColor: string,
  logo: string,
  appName: string,
  tenancyName: string,
  name: string,
  titleMeta: string,
  lang: string,
  isMaintain: boolean,
  isGDM: boolean,
  currency: string,
  areaCode: string,
}

export type Respond = {
  error: {
    message: string
  },
  result: any,
  success: boolean,
  targetUrl: any,
  unAuthorizedRequest: boolean,
}

export type OldAccountInfoType = {
  name: string,
  surname: string,
  userName: string,
  phoneNumber: string,
  password: string,
  emailAddress: string
}

export type Account = null | {
  userId: number
  surName: string
  userName: string
  name: string
  phoneNumber: string
  email: string
  balance: number
  referralCode: string
}

export type MailType = null | {
  body: string,
  creationTime: string,
  id: number,
  receiverName: string,
  senderName: string,
  subject: string,
  status: boolean,
}

export type Bank = null | {
  accountName: string,
  accountNumber: string,
  bankName: string,
  bankShortName: string,
  displayName: string,
  statusImage: boolean,
  logo: string,
  imageUrl: string,
  id: number,
  maximumDeposit: number,
  minimumDeposit: number,
  maximumWithdraw: number,
  minimumWithdraw: number,
}

export type CrpytoBank = {
  cryptoName: string,
  cryptoNumber: string,
  cryptoShortName: string,
  displayName: string,
  id: number,
  imageUrl: string,
  logo: string,
  maximumDeposit: number,
  minimumDeposit: number,
  rate: number,
}

export type BankToAdd = {
  name: string
  shortName: string
  currency: string
  logo: string
  tenantId: number
  tenancyName: string
  id: number
}

export type TSlider = {
  category: string
  displayNumber: number
  endTime: Date
  id: number
  imageUrl: string
  imageUrlMobile: string
  isChangeFile: boolean
  isChangeFileMobile: boolean
  lang: string
  startTime: Date
  tenantId: number
  title: string
}

export type Announcement = {
  announcementApi: boolean
  body: string
  color: any
  endDate: any
  endTime: string
  endTimeStr: string
  id: number
  isActive: boolean
  isChangeFile: boolean
  link: any
  startDate: any
  startTime: string
  startTimeStr: string
  tenantId: number
  title: string
  type: string
}

export type CryptoBank = null | {
  cryptoName: string,
  cryptoNumber: string,
  cryptoShortName: string,
  displayName: string,
  id: number,
  imageUrl: string,
  logo: string,
  maximumDeposit: number,
  minimumDeposit: number,
  rate: number,
}

export type TPromotion = null | {
  tenantId: number
  name: string
  content: string
  detail: any
  status: boolean
  promotionType: string
  type: string
  displayNumber: number
  lang: any
  urlImage: string
  urlImageMobile: any
  parameter: any
  procedureName: any
  gameType: any
  startTime: any
  endTime: any
  promotionSub: any
  creationTime: string
  creatorUserName: any
  creatorUserId: any
  lastModifierUserName: any
  lastModifierUserId: any
  lastModificationTime: any
  isActive: boolean
  isChangeFile: boolean
  amountBuy: number
  statusPromotion: string
  typeName: string
  fixedAmount: boolean
  detailPromotion: PromotionDetail[]
  id: number
}

export type PromotionDetail = {
  key: string,
  text: string,
  value: string,
}

export type Vip = null | {
  points: number
  turnover: number
  username: string
  userId: string
  refferalCode: string
  currentLevelName: string
  nextLevelName: string
  nextLevelPoint: number
  nextLevelWinloss: number
  status: boolean
  qrReferer: any
  lastModificationTime: string
}

export type AffiliateTier = null | {
  tier: string
  level: string
  requirement: number
  rewards: number
  rewardTurnover: number
}

export type Affiliate = null | {
  affiliateWallet: AffiliateWallet
  affiliateDetail: AffiliateDetail
  conditions: Condition[]
  lastModificationTime: string
}

interface AffiliateWallet {
  walletAmount: any
  lastUpdate: any
}

interface AffiliateDetail {
  totalInvite: number
  tierLevel: any
  tierReward: any
}

interface Condition {
  key: string
  text: string
  value: boolean
}

export type Downline = null | {
  summary: Summary
  profit: Profit[]
  totalProfit: number
}

interface Summary {
  totalInvite: number
  totalDeposit: number
  totalTurnover: number
  totalWinloss: number
}

interface Profit {
  userId: number
  username: string
  turnover: number
  profit: number
}
export type TGame = {
  display_order: number,
  game_code: string,
  game_name_en: string,
  game_type: string,
  imageURL: string,
  platform: string,
  playable: boolean,
  rtp: number,
}
export type AnnouncementType = {
  body: string,
  endTime: string,
  startTime: string,
  id: number,
  title: string,
  type: string,
  link:string
}
export type ContentSettingType = {
  category: string,
  content: string,
  creationTime: string,
  creatorUserId: number,
  id: number,
  imageUrl: string,
  name: string,
  link: string,
}

export type Record = {
  tenantId: number
  transCode: string
  currency: string
  status: string
  type: string
  isAgentTrans: boolean
  isTransIn: boolean
  userId: number
  userName: string
  creationTime: string
  creationTimeId: number
  startAmount: number
  amountChange: number
  endAmount: number
  startVipPoint: number
  vipPointChange: number
  endVipPoint: number
  clientIp: string
  note: any
  editor: any
  lastModifierUserName: string
  id: number
}

export type GameReportInfo = null | {
  txTime: string
  bizDate: string
  betAmt: any
  winAmt: number
  gameName: string
  gameType: string
  userId: string
  roundId: string
  betType: any
  platformTxId: string
  platformDisplayName: string
  userName: any
  winLoss: number
  turnover: number
  txTimeParse: string
  statis1: string
  statis2: string
  statis3: any
  statis4: any
  statis5: any
  statis6: any
  odds: number
  hdp: any
  htScore: any
  ftScore: any
  gameInfoJson: string
  matchInfoJson: any
  gameInfo: any
  matchInfo: any
}

export type TRegisterForm = {
  userName: string
  name: string
  phoneNumber: string
  password: string
  referralCode?: string
  emailAddress: string
  surname?: string
  tenancyName: any
}

export type TLoginForm = {
  usernameOrEmailAddress: string,
  password: string,
  TenancyName?: string
}

export type TGameForm = {
  platform: string,
  gametype: string,
  status?: string,
  tenancyName?: string,
}

export type TLinkGameForm = {
  platform: string,
  game_code: string,
}

export type TPromotionForm = {
  PromotionId?: number,
  BuyAmount?: number | string
}

export type TChangePasswordForm = {
  currentPassword: string,
  newPassword: string,
}

export type TAddBankForm = {
  accountNumber: string,
  displayName: string,
  accountName?: string,
  bankName?: string,
  bankShortName?: string,
}

export type TTransactionsForm = {
  type: string,
  paymentCategory?: string,
  principalAmount?: string,
  amount: string,
  agentBankName?: string,
  agentBankShortName?: string,
  agentAccountName?: string,
  agentAccountNumber?: string,
  playerBankName: string,
  playerBankShortName: string,
  playerAccountName: string,
  playerAccountNumber: string,
  bankReceipt?: string,
  memo?: string
}

export type TGetRecordsForm = { 
  transactionType: string,
  paymentType: string,
  transactionFrom: string,
  transactionTo: string,
  skipCount: number,
  maxResultCount: number,
}

export type TGetTransactionHistoryForm = {
  platform: string,
  StartDate: string,
  EndDate: string,
  skipCount: number,
  maxResultCount: number,
}

export type TRememberMe = null | {
  isCheckRemember: boolean,
  username: string,
  password: string,
}

export type TGameType = {
  game_type: string
  game_type_name: string
  game_type_name_home: string
  display_order: number
  platforms: TPlatform[]
}

export type TPlatform = {
  platform: string
  platform_name: string
}