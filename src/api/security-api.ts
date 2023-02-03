import { instance} from "./api";


type SecurityResponseType = {
  url:string
}

export const securityAPI = {
  async getCaptchaUrl(){ 
    const response = await instance.get<SecurityResponseType>(`security/get-captcha-url`)
    return response.data
    }
  }

