export enum LoginFormEnum {
  Username = "usernameOrEmailAddress",
  Password = "password",
  TenancyName = "dhdemo",
}

export enum RecordFormEnum {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  PROMOTION = "PROMOTION",
  AFFILIATE = "AFFILIATE"
}

export enum RecordStatusEnum {
  ACCEPT = "ACCEPTED",
  PENDING = "PENDING",
  REJECT = "REJECTED",
}

export enum PageEnum {
  SignUp = "register",
  Home = "home",
  Promo = "promotion",
  Account = "account",
  Withdraw = "withdraw",
  BankAccount = "myBankAccount",
  Deposit = "deposit",
  Wallet = "wallet",
  Record = "records",
  Profile = "profile",
  Inbox = "inbox",
  Announce = "announcement",
  ChangePass = "change-password",
  Policies = "policies",
  Transaction = "report",
  More = "more",
  Vip = "vip",
  Affiliate = "affiliate",
  Downline = "downline",
  LiveChat = "livechat",
}

export enum AccountGroupEnum {
  BANK = "bank",
  USER = "user",
  MESSAGE = "message",
  VIP = "vip",
}

export enum ChangePwEnum {
  OldPw = "oldPw",
  NewPw = "newPw",
  ConfirmPw = "confirmPw",
}

export enum BankAccountType {
  ADD = "addbank",
}

export enum TypeDeposit {
  BANK = "banking",
  CRYPTO = "crypto",
}

export enum DepositType {
  NetBanking = "NET_BANKING",
  Crypto = "CRYPTO",
}

export enum WithdrawType {
  NetBanking = "netbanking",
  ADD = "addbank",
}

export enum ListCategory {
  HOME = "",
  LIVEARENA = "LIVEARENA",
  LIVE = "LIVE",
  FH = "FH",
  SPORTS = "SPORTS",
  SLOT = "SLOT",
  LOTTERY = "LOTTERY",
  ARCADE = "ARCADE",
  RNGTABLE = "RNGTABLE",
}

export enum NavItemEnum {
  HOME = "",
  CASINO = "LIVE",
  SLOT = "SLOT",
  ARCADE = "ARCADE",
  FISHING = "FH",
  TABLE = "RNGTABLE",
  SPORT = "SPORTS",
  LIVE = "LIVEARENA",
  LOTTERY = "LOTTERY",
}

export enum VipLevel {
  PREMIER = "premier",
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  PLATINUM = "platinum",
  DIAMOND = "diamond",
  CHAIRMAN = "chairman",
}

export enum PoliciesEnum {
  Terms = "terms",
  DisconnectPolicies = "disconnect",
  PrivacyPolicies = "privacy",
}

export enum PromoEnum {
  ALL = "All",
  WELCOME = "WELCOME_BONUS",
  DEPOSIT = "DEPOSIT",
  REWARD = "REWARD",
  REBATE = "REBATE",
}

export enum StatusPromotion {
  NOTACTIVE = "",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
}

export enum PromotionDetailEnum {
  BONUS = "bonus",
  TURNOVER = "turnover",
  MINDEPO = "mindeposit",
  MAXBONUS = "maxbonus",
}
export enum ContentSettingEnum {
  CONTACT = 'CONTACT',
  PAYMENT = 'PAYMENT',
  SOCIAL = 'SOCIAL',
}

export enum SocialContactEnum {
  TELEGRAM = "telegram",
  VIBER = "viber",
  LINE="line",
  FACEBOOK = "facebook",
  MESSENGER = "messenger",
  TWITTER = "twitter",
  MAIL = "mail",
  INSTAGRAM = "instagram",
}
export enum ForgotPwEnum {
  Code = "resetCode",
  Pass = "password",
}