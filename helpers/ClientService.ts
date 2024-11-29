import { TenancyType, TRememberMe } from "@/constants/type";
import { decryptWithAES, encryptWithAES } from "./encrypt-password";

class ClientService {
  rememberMe: TRememberMe = null;
  user: any = null;
  tenancy: TenancyType = null;
  constructor() {
    const ISSERVER = typeof window !== "undefined";
    if (ISSERVER) {
      const rememberMe: any = localStorage.getItem("rememberMe")
      const tenancy: any = localStorage.getItem('tenancy')
      const token = localStorage.getItem("token");
      switch (true) {
        case !!token:
          this.user = {
            token: token
          }
        case !!tenancy:
          const tenencyParse = JSON.parse(tenancy)
          this.tenancy = {
            ...tenencyParse
          }
        case !!rememberMe:
          const rememberMeParse = JSON.parse(rememberMe)
          const decriptRememberMe = {
            isCheckRemember: rememberMeParse ? rememberMeParse.isCheckRemember : false,
            username: rememberMeParse ? rememberMeParse.username : "",
            password: rememberMeParse ? decryptWithAES(rememberMeParse.password) : ""
          }
          this.rememberMe = {
            ...decriptRememberMe
          }
      }
    }
  }

  getRememberMe() {
    return this.rememberMe;
  }

  setRememberMe(newRememberMe: TRememberMe) {
    if (this.rememberMe === newRememberMe) return;
    this.rememberMe = newRememberMe
  }

  saveRememberMe(rememberState: any) {
    const encryptRemember = {
      ...rememberState,
      password: encryptWithAES(rememberState.password)
    }
    const jsonRememberMe = JSON.stringify(encryptRemember)
    if (typeof window !== "undefined") {
      localStorage.setItem('rememberMe', jsonRememberMe)
    }
    this.setRememberMe(rememberState)
  }

  unSaveRememberMe() {
    this.setRememberMe(null)
    localStorage.removeItem("rememberMe")
  }

  setUser(newUser: any) {
    if (this.user === newUser) return;
    this.user = newUser;
  }
  getUser() {
    return this.user;
  }
  isAuthenticated() {
    return !!this.user;
  }

  login(token: string) {
    const loginUser = {
      token: token
    }
    localStorage.setItem('token', token)
    this.setUser(loginUser);
  }
  logout() {
    localStorage.removeItem('token')
    this.setUser(null);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ClientService()