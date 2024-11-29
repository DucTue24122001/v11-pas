import { OldAccountInfoType, TPromotion, PromotionDetail, Announcement, ContentSettingType, TGame, TGameType } from "@/constants/type";
import { PromoEnum, PromotionDetailEnum, NavItemEnum, PoliciesEnum } from "@/constants/enum";
import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    //hamburger menu
    isShowMenu: false,
    //language
    language: "EN",
    languageList: <string[]>[],
    isShowLanguageModal: false,

    //home-header
    annoucements: <Announcement[]>[],


    //login
    loginForm: {
      usernameOrEmailAddress: "",
      password: "",
    },
    isCheckRemember: false,
    isShowRegistOldAccountModal: false,
    oldAccountRegistInfo: <OldAccountInfoType>{
      name: "",
      userName: "",
      phoneNumber: "",
      password: "",
      emailAddress: "",
    },
    isShowForgotPwModal: false,
    isShowLoginModal: false,
    isRegisterModal: false,
    isLoginOrRegister:false,

    //policies
    currentPolicies: <PoliciesEnum>"",

    //GameType
    allGameTypes: <TGameType[]>[],
    allGameList: <TGame[]>[],
    currentCategorySelect: <NavItemEnum>NavItemEnum.HOME,
    currentPlatform: "",
    gameFilter: {
      inputSearch: "",
      currentFilter: "",
    },
    //playing game
    currentGameUrl: "",
    currentGamePlayInfo: <TGame>{},
    isLoadingUrl: false,
    isShowPlayingGameModal: false,
    isTogglePlayingGameModal: false,
    // social network
    socialListInfo: <ContentSettingType[]>[],
    contactListInfo: <ContentSettingType[]>[],
    footerBankList: <ContentSettingType[]>[],


    //promotion
    isShowPromotionModal: false,
    currentPromoType: PromoEnum.ALL,
    promotionList: <TPromotion[]>[],
    allPromoType: <string[]>[],
    currentPromo: <TPromotion>{},
    currentBonus: <number>0,
    currentTurnover: <number>0,
    currentMinDeposit: <number>0,
    currentMaxBonus: <number>0,
    promotionCheck: true,
  },
  reducers: {
    //hamburger menu
    handleShowMenu(state, action) {
      state.isShowMenu = action.payload;
    },

    //language
    setLanguageList(state, action) {
      state.languageList = action.payload
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    handleShowLanguageModal(state, action) {
      state.isShowLanguageModal = action.payload;
    },

    //login
    setRememberMeLogin(state, action) {
      const rememberMeState = action.payload;
      state.loginForm.usernameOrEmailAddress = rememberMeState.username;
      state.loginForm.password = rememberMeState.password;
    },
    setIsCheckRemember(state, action) {
      state.isCheckRemember = action.payload;
    },
    setLoginForm(state, action) {
      const { name, value } = action.payload;
      state.loginForm = { ...state.loginForm, [name]: value };
    },
    handleShowRegistOldAccountModal(state, action) {
      state.isShowRegistOldAccountModal = action.payload
    },
    handleShowForgotPwModal(state, action) {
      state.isShowForgotPwModal = action.payload;
    },
    handleShowLoginModal(state, action) {
      state.isShowLoginModal = action.payload;
    },
    setLoginOrRegister(state, action) {
      state.isLoginOrRegister = action.payload;
    },

    //Register
    handleShowRegisterModal(state, action) {
      state.isRegisterModal = action.payload;
    },
    setOldAccountRegistInfo(state, action) {
      state.isShowRegistOldAccountModal = true
      state.oldAccountRegistInfo = { ...state.oldAccountRegistInfo, ...action.payload };
    },
    
    //GameType & platform
    setAllGameType(state, action) {
      state.allGameTypes = action.payload
    },
    setAllGameList(state, action) {
      state.allGameList = action.payload
    },
    setCategorySelect(state, action) {
      state.currentCategorySelect = action.payload
    },
    setCurrentPlatform(state, action) {
      state.currentPlatform = action.payload
    },
    setGameFilter(state, action) {
      state.gameFilter = action.payload;
    },
    //promotion modal

    //home-header
    setAnnouncements(state, action) {
      state.annoucements = action.payload
    },
    //playing game modal
    setCurrentGameUrl(state, action) {
      const currentGame = action.payload
      state.isLoadingUrl = true
      state.isTogglePlayingGameModal = false
      state.currentGameUrl = currentGame.gameUrl
      state.currentGamePlayInfo = currentGame.gameInfo
    },
    setLoadingUrl(state, action) {
      state.isLoadingUrl = action.payload
    },
    setShowPlayingGameModal(state, action) {
      state.isShowPlayingGameModal = action.payload
    },
    setTogglePlayingGameModal(state, action) {
      state.isTogglePlayingGameModal = action.payload
    },
    //Policies
    setCurrentPolicies(state, action) {
      state.currentPolicies = action.payload;
    },
    //Social network
    setContactListInfo(state, action) {
      state.contactListInfo = action.payload;
    },
    setSocialListInfo(state, action) {
      state.socialListInfo = action.payload;
    },
    setFooterBankList(state, action) {
      state.footerBankList = action.payload;
    },

    //promotion
    setPromoList(state, action) {
      const promoList = action.payload
      state.promotionList = promoList;
      state.currentPromoType = PromoEnum.ALL;
      state.allPromoType = []
      promoList.map((promo: TPromotion) => {
        if(promo) {
          if (!state.allPromoType.includes(promo.typeName)) {
            state.allPromoType = [...state.allPromoType, promo.typeName]
          }
        }
      })
    },
    setCurrentPromotionType(state, action) {
      state.currentPromoType = action.payload
    },
    handleShowPromotionModal(state, action) {
      state.isShowPromotionModal = action.payload
    },
    setCurrentPromo(state, action) {
      const currentPromotion = action.payload
      state.currentPromo = currentPromotion
      if (currentPromotion?.detailPromotion) {
        const bonusObj = currentPromotion.detailPromotion.find((detail: PromotionDetail) => detail.key.toLowerCase() === PromotionDetailEnum.BONUS)
        const turnoverObj = currentPromotion.detailPromotion.find((detail: PromotionDetail) => detail.key.toLowerCase() === PromotionDetailEnum.TURNOVER)
        const minDepositObj = currentPromotion.detailPromotion.find((detail: PromotionDetail) => detail.key.toLowerCase() === PromotionDetailEnum.MINDEPO)
        const maxBonusObj = currentPromotion.detailPromotion.find((detail: PromotionDetail) => detail.key.toLowerCase() === PromotionDetailEnum.MAXBONUS)
        if (bonusObj) {
          state.currentBonus = +bonusObj.value.replace(/[^0-9]/g, "")
        }
        if (turnoverObj) {
          state.currentTurnover = +turnoverObj.value.replace(/[^0-9]/g, "")
        }
        if (minDepositObj) {
          state.currentMinDeposit = +minDepositObj.value.replace(/[^0-9]/g, "")
        }
        if (maxBonusObj) {
          state.currentMaxBonus = +maxBonusObj.value.replace(/[^0-9]/g, "")
        }
      }
    },
    buyPromoFunctionHandler(state) {
      state.promotionCheck = !state.promotionCheck
      state.isShowPromotionModal = false
    },
  }
})

export const clientAction = clientSlice.actions

